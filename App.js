import React from 'react';
import buildStore from './store/buildStore';
import { MainNavigator } from './navigation/mainNavigator';
import { Provider } from 'react-redux';
import {UIManager} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Platform} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

const store = buildStore();

const fetchFonts = async () => {
  await Font.loadAsync({
    'author-r': require('./assets/fonts/Author-Regular.ttf'),
    'author-l': require('./assets/fonts/Author-Light.ttf'),
    'author-sm': require('./assets/fonts/Author-Semibold.ttf'),


  })
}

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export default function App() {
  const [isFontsLoaded, setFontsLoaded] = React.useState(false);

  if (!isFontsLoaded){
    return (
      <AppLoading startAsync={fetchFonts} 
                  onFinish={() => setFontsLoaded(true)} 
                  onError={() => console.log('error')}/>
    )
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </Provider>
  );
}
