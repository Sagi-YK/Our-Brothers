import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { db } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";

const deviceWidth = Dimensions.get("window").width;

const deviceHeight = Dimensions.get("window").height;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const userRef = collection(db, "users");

function ManagerApproval(props) {
  const [state, setState] = useState([]); //current user
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const projectRef = collection(db, "projects"); // reference to collection projects

    // onSnapshot is a lisiting to refTode (collection)
    const subscriber = onSnapshot(projectRef, {
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
            !item.data().status &&
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

    return () => subscriber();
  }, []);

  // when user press on aprrove button ask him if he sures he wants to approve project,
  //and if he does goes to aprroveProject function
  const handleAprrove = (item) => {
    Alert.alert("", "לאשר פרויקט זה?", [
      { text: "סגור" },
      { text: "אישור", onPress: () => approveProject(item) },
    ]);
  };

  // update the database that this project(item) is approved
  const approveProject = async (item) => {
    const docRef = doc(db, `projects/${item.id}`); // reference to specific doc, now i can update its fileds,delete it,etc

    updateDoc(docRef, { status: !item.status }); // update specific filed in the doc

    getDocs(userRef).then((querySnapshot) => {
      const tokens = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().token) {
          tokens.push(doc.data().token);
        }
      });

      if (tokens.length > 0) {
        const notifications = tokens.map((token) => ({
          to: token,
          title: "מיזם חדש",
          body: "מיזם חדש עלה לאוויר!",
        }));

        Promise.all(
          notifications.map((notification) =>
            fetch("https://exp.host/--/api/v2/push/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(notification),
            })
          )
        )
          .then((responses) => {
            responses.forEach((response) => {
              if (!response.ok) {
                console.error(
                  "Error sending push notification:",
                  response.status,
                  response.statusText
                );
              }
            });
            console.log("Push notifications sent successfully");
          })
          .catch((error) => {
            console.error("Error sending push notifications:", error);
          });
      }

      setModalVisible(false);
      setSelectedEvent(null);
    });
  };

  const handleCancell = (item) => {
    Alert.alert("", "למחוק פרויקט זה?", [
      { text: "סגור" },
      { text: "אישור", onPress: () => removeProject(item) },
    ]);
  };

  const removeProject = async (item) => {
    const querySnapshot = await getDocs(userRef);
    let tokens = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().email === item.creator) {
        if (doc.data().token) {
          tokens.push(doc.data().token);
        }
        return;
      }
    });

    if (tokens.length > 0) {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: tokens,
          title: "ביטול מיזם",
          body: "מיזם שהצעת לא עבר אישור של מנהל",
        }),
      });
    }
    const docRef = doc(db, `projects/${item.id}`);

    deleteDoc(docRef); // delete this doc
    setModalVisible(false);
    setSelectedEvent(null);
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

  const formatTime = (time) => {
    const eventTime = new Date(time.seconds * 1000);
    return eventTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      {state.length === 0 ? (
        <View style={styles.containerMessage}>
          <Text style={styles.message}>אין מיזמים שמחכים לאישור </Text>
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          {state.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.Eventbutton}
              onPress={() => {
                setSelectedEvent(event);
                setModalVisible(true);
              }}
            >
              <View>
                <Text style={styles.EventText}>{event.name}</Text>
                <Text style={styles.EventTextTime}>
                  {event.date ? extractDate(event.date) : "טרם נקבע תאריך"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
                  <Text style={{ fontWeight: "bold" }}>שם המיזם:</Text>{" "}
                  {selectedEvent.name}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>תאריך המיזם:</Text>{" "}
                  {selectedEvent.date ? extractDate(selectedEvent.date) : null}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>
                    שעת המיזם:{" "}
                    {selectedEvent.time ? formatTime(selectedEvent.time) : null}
                  </Text>
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>מיקום המיזם:</Text>{" "}
                  {selectedEvent.location}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>פרטים:</Text>{" "}
                  {selectedEvent.description}
                  {"\n\n"}
                  <Text style={{ fontWeight: "bold" }}>פרטי קשר:</Text>{" "}
                  {selectedEvent.creator}
                  {"\n\n"}
                </Text>
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancellButton}>
                  <Text
                    style={styles.CloseButtonText}
                    onPress={() => handleCancell(selectedEvent)}
                  >
                    ביטול מיזם
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.joinButton}>
                  <Text
                    style={styles.joinButtonText}
                    onPress={() => handleAprrove(selectedEvent)}
                  >
                    אישור מיזם
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.adminButtonContainer}>
                <TouchableOpacity
                  style={styles.CloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.CloseButtonText}>סגור</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent:'center',
    alignItems: "center",
    paddingTop: 50,
    flex: 1,
    //width:"100%"

    backgroundColor: "#dcdcdc",
    // flex: 1,
  },
  scroll: {
    backgroundColor: "#DCDCDC",
  },
  Eventbutton: {
    width: deviceWidth - 40,
    height: 80,
    // backgroundColor: "#00a099",
    backgroundColor: "white",

    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderWidth: 3,
    // borderColor: "#00a099",
    borderColor: "#0c2e63",
    position: "relative",
    overflow: "hidden",
  },
  EventText: {
    fontSize: 25,
    color: "#0c2e63",
    // color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  EventTextTime: {
    fontSize: 20,
    color: "#0c2e63",
    // color: "white",

    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  containerMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
    fontSize: 25,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  joinButton: {
    backgroundColor: "#32CD32",
    borderRadius: 15,
    padding: 8,
    elevation: 2,
    flex: 1,
    margin: 10,
  },
  joinButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  CloseButton: {
    backgroundColor: "black",
    borderRadius: 15,
    padding: 9,
    elevation: 2,
    flex: 1,
    margin: 10,
  },
  cancellButton: {
    backgroundColor: "#f44336",
    borderRadius: 15,
    padding: 8,
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
});

export default ManagerApproval;
