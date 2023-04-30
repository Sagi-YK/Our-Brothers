import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Example from './components/Example';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        }
      }}>
        <Tab.Screen
          name='Profile'
          component={Example}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name='account' color={color} size={30} />)
          }}
        />
        <Tab.Screen
          name="Plus"
          component={Example}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name='plus-circle' color={color} size={40} />),
          }}
        />
        <Tab.Screen
          name='Home'
          component={Example}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name='home' color={color} size={30} />)
          }}
        />
      </Tab.Navigator>
      <StatusBar style={'dark'}/>
    </NavigationContainer>
  );
}

