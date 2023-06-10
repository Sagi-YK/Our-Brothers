import React from 'react';
import SignUpScreen from './SignUpScreen';
import LogInScreen from './LogInScreen';
import NewPasswordScreen from './NewPasswordScreen'
import RestartPasswordScreen from './RestartPasswordScreen'
import SendCodeScreen from './SendCodeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeScreen from './AdminHomeScreen'
const Stack = createNativeStackNavigator();

function LoginNavScreen(props) {
    return (
   
       <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'white'}}}>

          <Stack.Screen name="Log-In" component={LogInScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Sign-Up' component={SignUpScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Forgot-pass' component={RestartPasswordScreen} />
          <Stack.Screen name='Code-Screen' component={SendCodeScreen} />
          <Stack.Screen name='New-Password-Screen' component={NewPasswordScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='admin-screen' component={AdminHomeScreen} options={{ headerShown: false }}/>
        </Stack.Navigator> 
        
      
    
    );
}

export default LoginNavScreen;