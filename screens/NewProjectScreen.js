/**
 * this component will display an Our Brother message
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewProjectScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Project</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 50,
  },
});

export default NewProjectScreen;
