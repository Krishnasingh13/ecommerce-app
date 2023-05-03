import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
