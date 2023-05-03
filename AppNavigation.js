import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/stack/AuthStack';
import {useSelector} from 'react-redux';
import HomeStack from './src/stack/HomeStack';

const AppNavigation = () => {
  const auth = useSelector(state => state.auth);
  return (
    <>
      <StatusBar
        translucent={true}
        hidden={false}
        barStyle="dark-content"
        backgroundColor={'#fff'}
      />
      <NavigationContainer>
        {auth?.loggedIn ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigation;
