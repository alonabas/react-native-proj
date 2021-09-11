import React from 'react';
import buildStore from './store/buildStore';
import { MainNavigator } from './navigation/mainNavigator';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

const store = buildStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </Provider>
  );
}
