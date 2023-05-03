import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddProductScreen from '../screens/AddProductScreen';

const HomeStack = () => {
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
