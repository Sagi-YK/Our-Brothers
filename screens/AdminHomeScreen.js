import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "./ProfileScreen";
import StatisticsScreen from "./StatisticsScreen";
import ManagerApproval from "./ManagerApproval";
import React, { useEffect } from "react";
import { auth } from "../firebaseConfig";
import AdminManagment from "./AdminManagment";

const Stack = createStackNavigator();

const AdminHomeScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.navigate("MyProfile");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        component={AdminPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsersManagment"
        component={AdminManagment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="approval"
        component={ManagerApproval}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="stats"
        component={StatisticsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
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
    <ImageBackground
      source={require("../assets/final_wood.jpg")}
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.containerHead}>
          <Text style={styles.headText}>שלום מנהל</Text>
        </View>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.button} onPress={goToPage1}>
            <Text style={styles.buttonText}>התנתקות</Text>
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
  containerHead: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: 60,
  },
  containerButtons: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
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
    fontSize: 32,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});

export default AdminHomeScreen;
