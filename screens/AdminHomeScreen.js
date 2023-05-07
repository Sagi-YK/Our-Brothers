/**
 * this component will display the profile page
 */

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Our Brothers</Text>
//     </View>
//   );
// };
const AdminHomeScreen = ({ navigation }) => {
  const goToPage1 = () => {
    navigation.navigate("Page1");
  };

  const goToPage2 = () => {
    navigation.navigate("Page2");
  };

  const goToPage3 = () => {
    navigation.navigate("Page3");
  };

  const goToPage4 = () => {
    navigation.navigate("Page4");
  };

  // const goToPage5 = () => {
  //   navigation.navigate("Page5");
  // };

  return (
    <View style={styles.container}>
      <View style={styles.containerHead}>
        <Text style={styles.headText}>שלום</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button} onPress={goToPage1}>
          <Text style={styles.buttonText}>צור מיזם</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPage2}>
          <Text style={styles.buttonText}>רשימת מיזמים</Text>
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

export default ProfileScreen;
