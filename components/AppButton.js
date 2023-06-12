import React from "react";
import { View, StyleSheet, TouchableHighlight, Text, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import AppIcon from "./AppIcon";

function AppButton({
  text,
  onPress,
  style,
  secondary,
  TextStyle,
  icon_name,
  icon_size,
  icon_color,
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style, secondary]}
      activeOpacity={0.7}
      onPress={onPress}
      >
      {text !== undefined ? (
        <AppText text={text} style={TextStyle}></AppText>
        ) : (
          <AppIcon
          icon_name={icon_name}
          icon_size={icon_size}
          icon_color={icon_color}
          ></AppIcon>
          )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 270,
    height: 55,
    marginBottom: 30,
    borderRadius: 20,
    backgroundColor: "#007aff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppButton;
