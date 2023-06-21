import React from "react";
import SignUpScreen from "./SignUpScreen";
import LogInScreen from "./LogInScreen";
import NewPasswordScreen from "./NewPasswordScreen";
import RestartPasswordScreen from "./RestartPasswordScreen";
import SendCodeScreen from "./SendCodeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "./AdminHomeScreen";
const Stack = createStackNavigator();

function LoginNavScreen(props) {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen
        name="Log-In"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign-Up"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot-pass"
        component={RestartPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Code-Screen" component={SendCodeScreen} />
      <Stack.Screen
        name="New-Password-Screen"
        component={NewPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="admin-screen"
        component={AdminHomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default LoginNavScreen;
