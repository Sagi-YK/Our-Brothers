/**
 * this component will display an Our Brother message
 */
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  ImageBackground,
} from "react-native";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
  Timestamp,
} from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const projectRef = collection(db, "projects"); // reference to collection projects
const usersRef = collection(db, "users"); // reference to collection users
const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [state, setState] = useState([]);
  const navigation = useNavigation();
  const [login, setLogin] = useState("");

  const handlePress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleAdminPress = async (event) => {
    let tokens = [];
    const querySnapshot = await getDocs(usersRef);
    querySnapshot.forEach((doc) => {
      event.participants.forEach((userEmail) => {
        if (userEmail === doc.data().email) {
          if (userEmail !== event.creator) {
            if (doc.data().token) {
              tokens.push(doc.data().token);
            }
          }
        }
      });
    });

    if (tokens.length > 0) {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: tokens,
          title: "מיזם נמחק",
          body: "מיזם שנרשמת אליו נמחק",
        }),
      });
    }

    // setSelectedEvent(event);
    setModalVisible(false);
    cancel(event.id);
  };

  const cancel = async (item) => {
    const itemRef = doc(db, `projects/${item}`);
    await deleteDoc(itemRef);
  };

  const handleEventPress = async (event) => {
    const user = auth.currentUser;
    if (user) {
      // User is signed in, perform the action
      const uEmail = user.email; // save the current user email
      // check if we have participants to this project and concat event.participants to  mtparticipants
      const allData = await getDocs(usersRef);
      let flag = false;

      allData.forEach((doc) => {
        if (doc.data().email == uEmail) {
          userId = doc.id;
          doc.data().myEvents.forEach((currentEvent) => {
            if (currentEvent === event.id) {
              Alert.alert("", "המשתמש כבר רשום למיזם", [
                { text: "סגור", onPress: () => setModalVisible(false) },
              ]);
              flag = true;
              return;
            }
          });
        }
      });

      if (flag) {
        return;
      }

      let Myparticipants = []; //create empty array to save all the participats of the porject
      Myparticipants.push(uEmail);
      event.participants.forEach((currentParticipant) => {
        Myparticipants.push(currentParticipant);
      });

      //update the doc
      const docRefprojects = doc(db, `projects/${event.id}`);

      updateDoc(docRefprojects, {
        participants: Myparticipants,
        numpraticipants: event.numpraticipants + 1,
      });

      setModalVisible(false);
      Alert.alert("", "הצטרפת למיזם בהצלחה", [{ text: "סגור" }]);

      //const allData=await getDocs(usersRef);
      let dealisArray = [];
      let userId;
      dealisArray.push(event.id);
      // add the event to user events
      allData.forEach((doc) => {
        if (doc.data().email == uEmail) {
          userId = doc.id;
          doc.data().myEvents.forEach((currentEvent) => {
            dealisArray.push(currentEvent);
          });
        }
      });

      const docRefUsers = doc(db, `users/${userId}`);
      updateDoc(docRefUsers, { myEvents: dealisArray });
    } else {
      // User is not signed in, handle the case accordingly
      Alert.alert("", "עלייך להתחבר תחילה", [
        {
          text: "סגור",
          onPress: () => {
            setModalVisible(false);
            navigation.navigate("Profile");
          },
        },
      ]);
    }
  };
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setLogin(user.email);
      } else {
        // User is signed out
        setLogin("");
      }
    });

    const subscriberProject = onSnapshot(projectRef, {
      // next is the callback function the got called evry time the collection is changed
      // snapshot is object of the collection that contain the data of the collection (docs)
      next: (snapshot) => {
        const state = [];
        const currentTimestamp = Timestamp.now();
        snapshot.docs.forEach((item) => {
          const oneDayMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
          const previousDayTimestamp = new Timestamp(
            currentTimestamp.seconds - oneDayMilliseconds / 1000,
            currentTimestamp.nanoseconds
          );
          const itemTimestamp = item.data().date;
          if (
            item.data().status &&
            (itemTimestamp >= previousDayTimestamp || itemTimestamp == null)
          ) {
            state.push({
              id: item.id,
              ...item.data(),
            });
          }
        });
        setState(state);
      },
    });

    return () => {
      unsubscribeAuth();
      subscriberProject();
    };
  }, []);

  const formatTime = (time) => {
    const eventTime = new Date(time.seconds * 1000);
    return eventTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const extractDate = (date) => {
    const seconds = date.seconds;
    const milliseconds = seconds * 1000;
    const extractedDate = new Date(milliseconds);

    const year = extractedDate.getFullYear();
    const month = String(extractedDate.getMonth() + 1).padStart(2, "0");
    const day = String(extractedDate.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/final_wood.jpg")}
        style={styles.image}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            opacity: 10,
          }}
        ></View>
        {state.length === 0 ? (
          <View style={styles.containerMessage}>
            <Text style={styles.message}>אין מיזמים באוויר </Text>
          </View>
        ) : (
          <ScrollView style={styles.Scroll}>
            <View style={styles.mainPage}>
              {state.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  style={styles.Eventbutton}
                  onPress={() => handlePress(event)}
                  activeOpacity={0.7}
                >
                  <View>
                    <Text style={styles.EventText}>{event.name}</Text>
                    <Text style={styles.EventTextTime}>
                      {event.date ? extractDate(event.date) : "טרם נקבע תאריך"}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </ImageBackground>

      {selectedEvent && (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView
                style={styles.modalContent}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Text style={styles.modalText}>
                  <Text style={{ fontWeight: "bold" }}>שם המיזם:{"\n"}</Text>{" "}
                  {selectedEvent.name}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    תאריך המיזם:{"\n"}
                  </Text>{" "}
                  {selectedEvent.date ? extractDate(selectedEvent.date) : null}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    שעת המיזם:{"\n"}{" "}
                  </Text>{" "}
                  {selectedEvent.time ? formatTime(selectedEvent.time) : null}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    מיקום המיזם:{"\n"}
                  </Text>{" "}
                  {selectedEvent.location}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>פרטים:{"\n"}</Text>{" "}
                  {selectedEvent.description}
                  {"\n\n"}
                  {login === "Theproject.ourbrothers@gmail.com" ? (
                    <Text>
                      <Text style={{ fontWeight: "bold" }}>
                        פרטי קשר:{"\n"}
                      </Text>
                      <Text style={{ fontSize: 18 }}>
                        {selectedEvent.creator}
                      </Text>
                      {"\n\n"}
                    </Text>
                  ) : null}
                </Text>
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.CloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.CloseButtonText}>סגור</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.joinButton}>
                  <Text
                    style={styles.joinButtonText}
                    onPress={() => handleEventPress(selectedEvent)}
                  >
                    הצטרף
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.adminButtonContainer}>
                {login === "Theproject.ourbrothers@gmail.com" ? (
                  <TouchableOpacity
                    style={styles.DeleteButton}
                    onPress={() => {
                      Alert.alert(
                        "",
                        "למחוק את המיזם?",
                        [
                          {
                            text: "לא",
                            style: "cancel",
                          },
                          {
                            text: "כן",
                            onPress: () => handleAdminPress(selectedEvent),
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  >
                    <Text style={styles.CloseButtonText}>מחיקה</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dcdcdc",
    flex: 1,
  },
  navBar: {
    width: deviceWidth,
    height: deviceHeight / 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
  },
  mainPage: {
    paddingTop: 0,
    marginBottom: deviceHeight / 8,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  Scroll: {
    paddingTop: 0,
    maxHeight: deviceHeight - deviceHeight / 8 - deviceHeight / 12, // Adjust the maxHeight according to your needs
  },
  footer: {
    width: deviceWidth,
    height: deviceHeight / 10,
    borderTopColor: "black",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // added to make the buttons display side by side
    backgroundColor: "#87ceeb",
  },
  text: {
    marginTop: 50,
    fontSize: 40,
    textAlign: "center",
    color: "#00a099",
    fontWeight: "bold",
  },
  Eventbutton: {
    width: deviceWidth - 40,
    height: 80,
    backgroundColor: "white",

    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderWidth: 3,
    borderColor: "#0c2e63",
    position: "relative",
    overflow: "hidden",
  },
  EventText: {
    fontSize: 25,
    color: "#0c2e63",
    textAlign: "center",
    fontWeight: "bold",
  },
  EventTextTime: {
    fontSize: 20,
    color: "#0c2e63",

    textAlign: "center",
  },
  buttonfootrText: {
    fontSize: 18,
    color: "white",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: deviceHeight * 0.8,
    width: deviceWidth * 0.8,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  joinButton: {
    backgroundColor: "#4682B4",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    flex: 1,
    margin: 1,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  CloseButton: {
    backgroundColor: "#ab1818",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    flex: 1,
    margin: 10,
  },
  CloseButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  adminButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: deviceWidth / 3,
  },
  DeleteButton: {
    backgroundColor: "black",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    flex: 1,
    margin: 10,
  },
  message: {
    fontSize: 24,
    color: "#0c2e63",
    fontWeight: "bold",
  },
  containerMessage: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: deviceHeight / 2 - 80,
    backgroundColor: "white",
    height: 50,
    width: "80%",
    borderRadius: 20,
    borderColor: "#0c2e63",
    borderWidth: 2,
    alignSelf: "center", // Added to center horizontally
    alignContent: "center", // Added to center vertically
  },
});

export default HomeScreen;
