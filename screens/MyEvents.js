import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { app, db, auth } from "../firebaseConfig";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

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
          // next is the callback function the got called evry time the collection is changed
          // snapshot is object of the collection that contain the data of the collection (docs)
          next: (snapshot) => {
            const events = [];
            snapshot.docs.forEach((item) => {
              user.myEvents.forEach((usersample) => {
                if (usersample === item.id) {
                  console.log(usersample);
                  events.push({
                    id: item.id,
                    name: item.data().name,
                    time: item.data().time,
                    creator: item.data().creator,
                  });
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
    //  TODO - ADD AN ALERT
    const itemRef = doc(db, `projects/${item}`);
    await deleteDoc(itemRef);
  };

  const cancelAtend = async (item) => {
    //  TODO - ADD AN ALERT
    const itemRef = doc(db, `users/${user.id}`);
    let remainEvents = [];
    user.myEvents.forEach((oneEvent) => {
      if (oneEvent !== item.id) {
        remainEvents.push(oneEvent);
      }
    });
    updateDoc(itemRef, { myEvents: remainEvents });
    user['myEvents'] = remainEvents
    setUser(user)

    // let user = {};
    //     querySnapshot.forEach((doc) => {
    //       if (doc.data().email === userEmail) {
    //         user["email"] = doc.data().email;
    //         user["myEvents"] = doc.data().myEvents;
    //         user["id"] = doc.id;
    //       }
    //     });

    let updatedEvents = [];
    events.forEach((updateOneEvent) => {
      remainEvents.forEach((eve) => {
        if (eve === updateOneEvent.id) {
          updatedEvents.push(updateOneEvent);
        }
      });
    });
    setEvents(updatedEvents);
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
                <Text style={styles.itemTime}>שעה: {item.time}</Text>
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
                            onPress: () => cancel(item.id),
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

// TODO - ADD DATES CHECK!
// TODO - UPDATEEVENT - NEED TO SENT THE EVENT.ID TO THE NEW PAGE
