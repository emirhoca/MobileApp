import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Coffees from './CoffeeScreen';
import Qr from './Qr';
import HomeScreenAfterLoginned from './HomeScreenForLoginned';
import RegisterScreen from './RegisterScreen';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define a function to update isLoggedIn
  const updateIsLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  const HomeStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen">
        {(props) => <LoginScreen {...props} updateIsLoggedIn={updateIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="HomeScreenForLoginned" component={HomeScreenAfterLoginned} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
            } else if (route.name === 'Coffees') {
              iconName = 'coffee';
            } else if (route.name === 'User Account') {
              iconName = 'user';
            } else if (route.name === 'Qr') {
              iconName = 'jedi';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          inactiveTintColor: '#3e2465',
          style: { paddingBottom: 48 },
        })}
      >
        <Tab.Screen name="Qr">
          {(props) => <Qr {...props} isLoggedIn={isLoggedIn} />}
        </Tab.Screen>
        <Tab.Screen name="Coffees" component={Coffees} />
        <Tab.Screen name="User Account" component={HomeStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
