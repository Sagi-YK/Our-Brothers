import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProfileScreen from './screens/ProfileScreen';
import NewProjectScreen from './screens/NewProjectScreen';
import HomeScreen from './screens/HomeScreen';
import BackButton from './components/BackButton';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' backBehavior='history' screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: '10%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center'
        },
      }}>
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name='account' color={color} size={30} />)
          }}
        />
        <Tab.Screen
          name="מיזם חדש"
          component={NewProjectScreen}
          options={({navigation}) => ({
            headerStyle: {
              backgroundColor: '#33B8FF',
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              alignItems: 'center',
              width: '100%',
            },
            headerShown: true,
            headerLeft: () => <BackButton navigation={navigation} />,
            tabBarLabel: () => null,
            tabBarStyle: {display: 'none'},
            tabBarIcon: ({color, size}) => (<MaterialCommunityIcons name='plus-circle' color={'#33B8FF'} size={60} />),
          })}
        />
        <Tab.Screen
          name='Home'
          component={HomeScreen}
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

