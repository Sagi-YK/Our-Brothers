import React from 'react';
import SignUpScreen from './SignUpScreen';
import LogInScreen from './LogInScreen';
import NewPasswordScreen from './NewPasswordScreen'
import RestartPasswordScreen from './RestartPasswordScreen'
import SendCodeScreen from './SendCodeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function LoginNavScreen(props) {
    return (
   
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'#87cefa'}}}>
        <Stack.Screen name="Log-In" component={LogInScreen} />
        <Stack.Screen name='Sign-Up' component={SignUpScreen} />
        <Stack.Screen name='Forgot-pass' component={RestartPasswordScreen} />
        <Stack.Screen name='Code-Screen' component={SendCodeScreen} />
        <Stack.Screen name='New-Password-Screen' component={NewPasswordScreen} />
        
      </Stack.Navigator>
    
    );
}

export default LoginNavScreen;