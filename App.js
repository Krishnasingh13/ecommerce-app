import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigation from './AppNavigation';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <AppNavigation />
      </View>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
