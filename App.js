import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./screens/ProfileScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import HomeScreen from "./screens/HomeScreen";
import BackButton from "./components/BackButton";
import { auth } from "./firebaseConfig";
import AdminHomeScreen from "./screens/AdminHomeScreen";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const [login, setLogin] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setLogin(user.email);
      } else {
        // User is signed out
        setLogin("");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        screenOptions={{
          tabBarStyle: {
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          },
        }}
      >
        <Tab.Screen
          name="Profile"
          component={
            login === "" || login !== "iyarlevi5@gmail.com"
              ? ProfileScreen
              : AdminHomeScreen
          }
          options={{
            headerStyle: {
              backgroundColor: "#f5f5f5",
            },
            headerTitleStyle: {
              color: "#00a099",
              fontWeight: "bold",
              fontSize: 35,
            },
            headerTitleContainerStyle: {
              alignItems: "center",
              width: "100%",
            },
            headerShown: true,
            headerTitle: "האחים שלנו",
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="newProject"
          component={NewProjectScreen}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#4682B4",
            },
            headerTitleStyle: {
              color: "white",
              fontWeight: "bold",
            },
            headerTitleContainerStyle: {
              alignItems: "center",
              width: "100%",
            },
            headerShown: true,
            headerTitle: "מיזם חדש",
            headerLeft: () => <BackButton navigation={navigation} />,
            tabBarLabel: () => null,
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={"#00a099"}
                size={60}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: "#f5f5f5",
            },
            headerTitleStyle: {
              color: "#00a099",
              fontWeight: "bold",
              fontSize: 35,
            },
            headerTitleContainerStyle: {
              alignItems: "center",
              width: "100%",
            },
            headerShown: true,
            headerTitle: "האחים שלנו",
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
      <StatusBar style={"dark"} />
    </NavigationContainer>
  );
}
