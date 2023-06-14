// /**
//  * this component will display the profile page
//  */

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MyEvents from "./MyEvents";
import LoginNavScreen from "./LoginNavScreen";
import EditEvent from "./EditEvent";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Stack = createStackNavigator();

const ProfileScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Navigate to "MyProfile"
      navigation.navigate("MyProfile");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyProfile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LoginNavScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyEvents"
        component={MyEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditEvent"
        component={EditEvent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfilePage = ({ navigation }) => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");

  const goToPage1 = () => {
    navigation.navigate("LogIn");
  };

  const goToPage2 = () => {
    const user = auth.currentUser;
    if (user) {
      navigation.navigate("MyEvents");
    } else {
      Alert.alert("", "דרושה התחברות למערכת", [{ text: "אישור" }]);
    }
  };

  const goToPage4 = () => {
    Alert.alert("", "להמשיך בתהליך התנתקות?", [
      {
        text: "אישור",
        onPress: () => {
          auth.signOut();
        },
      },
      { text: "ביטול" },
    ]);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const func = async () => {
          const userRef = collection(db, "/users");
          const userEmail = user.email;
          const allUsers = await getDocs(userRef);
          allUsers.forEach((doc) => {
            if (doc.data().email == userEmail) {
              setName(doc.data().name);
            }
          });
        };
        func();
        setLogin(true);
      } else {
        // User is signed out
        setName("");
        setLogin(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ImageBackground
      source={require("../assets/final_wood.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.welcomeCont}>
          {!login ? (
            <Text style={styles.headText}>היי</Text>
          ) : (
            <Text style={styles.headText}>היי {name}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {!login ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={goToPage1}
            >
              <Text style={styles.buttonText}>התחברות</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={goToPage4}
            >
              <Text style={styles.buttonText}>התנתקות</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={goToPage2}
          >
            <Text style={styles.buttonText}>המיזמים שלי</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  welcomeCont: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70, // Increase the marginTop value to lower the buttons
    marginBottom: 30,
  },
  button: {
    width: 250,
    height: 55,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "#4682B4",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  headText: {
    color: "#000",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 0,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 70,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});

export default ProfileScreen;
