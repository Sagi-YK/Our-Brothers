// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { db } from "../firebaseConfig";
// import React, { useEffect, useState } from "react";
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button } from "react-native";
// import firebase from "firebase/app";
// import "firebase/auth";

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

const UpdateData = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    const user = firebase.auth().currentUser; // TODO - check why the "auth" is undifined

    // Update the email and password
    if (user) {
      user
        .updateEmail(email)
        .then(() => {
          console.log("Email updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating email:", error);
        });

      user
        .updatePassword(password)
        .then(() => {
          console.log("Password updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
    } else {
      setMessage(
        "You need to connect to your account before you can update your data."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>עדכון פרטי התחברות</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {/* <Button title="Update" onPress={handleUpdate} style={styles.button} /> */}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}> Update </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    width: 100,
    height: 60,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default UpdateData;
