import React from 'react';
import buildStore from './store/buildStore';
import { MainNavigator } from './navigation/mainNavigator';
import { Provider } from 'react-redux';
import {UIManager} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const store = buildStore();

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </Provider>
  );
}
