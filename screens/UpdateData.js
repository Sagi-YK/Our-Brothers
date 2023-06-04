import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import firebase from "firebase/app";
import "firebase/auth";

const UpdateData = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    const user = firebase.auth().currentUser;

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
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Data</Text>
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
      <Button title="Update" onPress={handleUpdate} style={styles.button} />
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
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    width: 200,
    marginTop: 16,
  },
});

export default UpdateData;
