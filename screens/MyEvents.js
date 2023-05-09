import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyEvents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pageText}>MyEvents</Text>
      <Text style={styles.pageContent}>list of events that i signup for</Text>
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

export default MyEvents;
