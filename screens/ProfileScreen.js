// /**
//  * this component will display the profile page
//  */

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "./LogIn";
import MyEvents from "./MyEvents";
import UpdateData from "./UpdateData";
import ProfileSetup from "./ProfileSetup";
import LoginNavScreen from "./LoginNavScreen";

const Stack = createStackNavigator();

const ProfileScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="LogIn" component={LoginNavScreen} />
      <Stack.Screen name="MyEvents" component={MyEvents} />
      <Stack.Screen name="UpdateData" component={UpdateData} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
    </Stack.Navigator>
  );
};

const ProfilePage = ({ navigation }) => {
  const goToPage1 = () => {
    navigation.navigate("LogIn");
  };

  const goToPage2 = () => {
    navigation.navigate("MyEvents");
  };

  const goToPage3 = () => {
    navigation.navigate("UpdateData");
  };

  const goToPage4 = () => {
    navigation.navigate("ProfileSetup");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.headText}>שלום</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button} onPress={goToPage1}>
          <Text style={styles.buttonText}>התחברות</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage2}>
          <Text style={styles.buttonText}>המיזמים שלי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage3}>
          <Text style={styles.buttonText}>עדכון פרטים</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage4}>
          <Text style={styles.buttonText}>הגדרות</Text>
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
