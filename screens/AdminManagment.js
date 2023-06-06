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

const AdminManagment = () => {
  const [users,setUsers] = useState([])
  const [eventUsers,setEventUsers] = useState([])
  const [events, setEvents] = useState([]);
  const userRef = collection(db, "users");
  const projectRef = collection(db, "projects");
  let subscriber;

//   useEffect(() => {
//     /// onSnapshot is a lisiting to refTode (collection)
//     const subscriber = onSnapshot(userRef,{
//         // next is the callback function the got called evry time the collection is changed
//         // snapshot is object of the collection that contain the data of the collection (docs)
//         next:(snapshot)=>{
//             const users =[]
//             snapshot.docs.forEach((item) => {
//                 users.push({
//                     id:item.id,
//                     ...item.data()
//                 })
//             })
//             console.log(users);
//             setUsers(users)
//         },
//     })
//     return () => subscriber();
//   }, []);

useEffect(() => {
    const userSubscriber = onSnapshot(userRef, {
      next: (snapshot) => {
        const users = [];
        snapshot.docs.forEach((item) => {
          users.push({
            id: item.id,
            ...item.data(),
          });
        });
        setUsers(users);
      },
    });
  
    const projectSubscriber = onSnapshot(projectRef, {
      next: (snapshot) => {
        const events = [];
        snapshot.docs.forEach((item) => {
            events.push({
              id: item.id,
              ...item.data(),
            });
          }
        );
        setEvents(events);
      },
    });
  
    return () => {
      userSubscriber();
      projectSubscriber();
    };
  }, []);
  

  const deleteUser = async (user) => {
    console.log(user);
    const userRef = doc(db, `users/${user.id}`);
    updateDoc(userRef, {isdeleted: true});

    user.myEvents.forEach((event) => {
        events.forEach(curEvent => {
            if (curEvent.id == event) {
                const updateUsers = [];
                const updateNumParticipants = curEvent.numpraticipants - 1;
                curEvent.participants.forEach((currUser) => {
                    if (currUser !== user.email) {
                        updateUsers.push(currUser);
                    }
                })
                setEventUsers(updateUsers);
                const projectRef = doc(db, `projects/${curEvent.id}`);
                updateDoc(projectRef, {participants: updateUsers, numpraticipants: updateNumParticipants});
            }
        })
    })
  };

  return (
    <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {item.isdeleted === false ? (
                <View>
                    <Text style={styles.itemName}>אימייל המשתמש: </Text>
                    <Text >{item.email}</Text>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                        Alert.alert(
                            "",
                            "האם אתה בטוח שאתה רוצה למחוק את המשתמש?",
                            [
                            {
                                text: "לא",
                                style: "cancel",
                            },
                            {
                                text: "כן",
                                onPress: () => deleteUser(item),
                            },
                            ],
                            { cancelable: true }
                        );
                        }}
                    >
                        <Text style={styles.buttonText}>מחיקת משתמש</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                ) : null
              }
            </View>
          )}
        />
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
    backgroundColor: "#f44336",
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

export default AdminManagment;

// TODO - ADD DATES CHECK!
// TODO - UPDATEEVENT - NEED TO SENT THE EVENT.ID TO THE NEW PAGE
