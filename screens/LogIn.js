import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LogIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>Omer's LogIn</Text>
      <Text style={styles.pageContent}>I am waiting for you.</Text>
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
  pageText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pageContent: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default LogIn;
