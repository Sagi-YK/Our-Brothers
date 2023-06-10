/**
 * this component will display the home page for the admin
 */

import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import StatisticsScreen from "./StatisticsScreen";
import ManagerApproval from "./ManagerApproval";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import AdminManagment from "./AdminManagment";

const Stack = createStackNavigator();

const AdminHomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={AdminPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UsersManagment" component={AdminManagment} />
      <Stack.Screen name="approval" component={ManagerApproval} />
      <Stack.Screen name="stats" component={StatisticsScreen} />
      <Stack.Screen name="profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const AdminPage = ({ navigation }) => {
  const goToPage1 = () => {
    Alert.alert("", "להמשיך בתהליך התנתקות?", [
      {
        text: "אישור",
        onPress: () => {
          auth.signOut();
          navigation.navigate("profile");
        },
      },
      { text: "ביטול" },
    ]);
  };

  const goToPage2 = () => {
    navigation.navigate("UsersManagment");
  };

  const goToPage3 = () => {
    navigation.navigate("approval");
  };

  const goToPage4 = () => {
    navigation.navigate("stats");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.headText}>שלום מנהל</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button} onPress={goToPage1}>
          <Text style={styles.buttonText}>התנתקות </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage2}>
          <Text style={styles.buttonText}>ניהול משתמשים</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage3}>
          <Text style={styles.buttonText}>אישור מיזמים</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage4}>
          <Text style={styles.buttonText}>סטטיסטיקות ונתונים</Text>
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
    width: 200,
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

export default AdminHomeScreen;