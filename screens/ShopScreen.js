import React from "react";
import {View, Text, TouchableHighlight} from 'react-native';
import {DrawerButton} from '../components/DrawerButton';
import {globalStyles} from '../constants/styles';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../constants/colors';


const ToCartButton = (props) => (
  <TouchableHighlight {...props}
                        activeOpacity={0.9} 
                        title='Go to cart'
                        underlayColor={'white'} 
                        style={globalStyles.menuButtonContainer}>
        <Ionicons name='cart-outline' size={25} color={COLORS.main}/>
    </TouchableHighlight>
)

export const ShopScreen = ({}) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
  </View>
)

export const ShopScreenOptions = ({ route, navigation }) => {
  return {
      headerLeft: (props) => (
          <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
      ),
      headerRight: (props) => (
          <ToCartButton {...props} 
                        onPress={() => navigation.navigate({name: 'cart'})} />
      ),
      headerTitle: 'Shop'
  }
}
