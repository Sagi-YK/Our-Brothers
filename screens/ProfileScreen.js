// /**
//  * this component will display the profile page
//  */

import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MyEvents from "./MyEvents";
import UpdateData from "./UpdateData";
import LoginNavScreen from "./LoginNavScreen";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={ProfilePage} />
      <Stack.Screen
        name="LogIn"
        component={LoginNavScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MyEvents" component={MyEvents} />
      <Stack.Screen name="UpdateData" component={UpdateData} />
    </Stack.Navigator>
  );
};

const ProfilePage = ({ navigation }) => {
  const [login, setLogin] = useState(false);

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

  const goToPage3 = () => {
    navigation.navigate("UpdateData");
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
        setLogin(true);
      } else {
        // User is signed out
        setLogin(false);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.headText}>שלום</Text>
      </View>
      <View style={styles.containerButtons}>
        {!login ? (
          <TouchableOpacity style={styles.button} onPress={goToPage1}>
            <Text style={styles.buttonText}>התחברות</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={goToPage4}>
            <Text style={styles.buttonText}>התנתקות</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={goToPage2}>
          <Text style={styles.buttonText}>המיזמים שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage3}>
          <Text style={styles.buttonText}>עדכון פרטים</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  containerHead: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginTop: 60,
  },
  containerButtons: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  button: {
    width: 250,
    height: 60,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headText: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
