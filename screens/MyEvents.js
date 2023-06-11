import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const userRef = collection(db, "users");
  const projectRef = collection(db, "projects");
  let subscriber;
  const userEmail = auth.currentUser.email;

  useEffect(() => {
    // Fetch the user's events from the database
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(userRef);
        let user = {};
        querySnapshot.forEach((doc) => {
          if (doc.data().email === userEmail) {
            user["email"] = doc.data().email;
            user["myEvents"] = doc.data().myEvents;
            user["id"] = doc.id;
          }
        });
        setUser(user);
        console.log(user);

        subscriber = onSnapshot(projectRef, {
          next: (snapshot) => {
            const events = [];
            const currentTimestamp = Timestamp.now();

            snapshot.docs.forEach((item) => {
              user.myEvents.forEach((usersample) => {
                if (usersample === item.id) {
                  const oneDayMilliseconds = 24 * 60 * 60 * 1000; // One day in milliseconds
                  const previousDayTimestamp = new Timestamp(
                    currentTimestamp.seconds - oneDayMilliseconds / 1000,
                    currentTimestamp.nanoseconds
                  );
                  const itemTimestamp = item.data().date;
                  console.log(item.data().date);
                  if (itemTimestamp >= previousDayTimestamp) {
                    events.push({
                      id: item.id,
                      name: item.data().name,
                      date: item.data().date,
                      time: item.data().time,
                      creator: item.data().creator,
                      participants: item.data().participants,
                      numpraticipants: item.data().numpraticipants,
                    });
                  }
                }
              });
            });
            setEvents(events);
            console.log(events);
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    return () => subscriber();
  }, []);

  const cancel = async (item) => {
    let tokens = [];
    const querySnapshot = await getDocs(userRef);
    querySnapshot.forEach((doc) => {
      item.participants.forEach((userEmail) => {
        if (userEmail === doc.data().email) {
          if (userEmail !== item.creator) {
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
    const itemRef = doc(db, `projects/${item.id}`);
    deleteDoc(itemRef);
  };

  const cancelAtend = async (item) => {
    const itemRef = doc(db, `users/${user.id}`);
    const projectRef = doc(db, `projects/${item.id}`);
    let remainEvents = [];
    // item.data().numpraticipants = item.data().numpraticipants - 1;
    user.myEvents.forEach((oneEvent) => {
      if (oneEvent !== item.id) {
        remainEvents.push(oneEvent);
      }
    });
    const iyar = item.participants.filter((ev) => {
      return ev !== user.email;
    });
    updateDoc(itemRef, { myEvents: remainEvents });
    updateDoc(projectRef, {
      numpraticipants: item.numpraticipants - 1,
      participants: iyar,
    });
    user["myEvents"] = remainEvents;
    setUser(user);

    setEvents(
      events.filter((val) => {
        return val.id !== item.id;
      })
    );
  };

  const formatTime = (time) => {
    const date = new Date(time.seconds * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
      {events.length === 0 ? (
        <View style={styles.containerMessage}>
          <Text style={styles.message}>עוד לא נרשמת לאף מיזם</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>שם המיזם: {item.name}</Text>

              {item.time == undefined ? (
                <Text style={styles.itemTime}> טרם נקבע שעה </Text>
              ) : (
                <Text style={styles.itemTime}>
                  שעה: {formatTime(item.time)}
                </Text>
              )}

              {item.date == undefined ? (
                <Text style={styles.itemTime}> טרם נקבע תאריך </Text>
              ) : (
                <Text style={styles.itemTime}>
                  תאריך: {extractDate(item.date)}
                </Text>
              )}

              {item.creator === userEmail ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      Alert.alert(
                        "",
                        "לבטל את המיזם?",
                        [
                          {
                            text: "לא",
                            style: "cancel",
                          },
                          {
                            text: "כן",
                            onPress: () => cancel(item),
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>ביטול מיזם</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>עריכת מיזם</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      Alert.alert(
                        "",
                        "לבטל השתתפות במיזם?",
                        [
                          {
                            text: "לא",
                            style: "cancel",
                          },
                          {
                            text: "כן",
                            onPress: () => cancelAtend(item),
                          },
                        ],
                        { cancelable: true }
                      );
                    }}
                  >
                    <Text style={styles.buttonText}>ביטול השתתפות</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  containerMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemTime: {
    fontSize: 14,
    color: "#666666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 30,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#007aff",
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  message: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
});

export default MyEvents;

// TODO - UPDATEEVENT - NEED TO SENT THE EVENT.ID TO THE NEW PAGE
