import React from "react";
import {View, Text, TouchableHighlight} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../constants/colors';
import {DrawerButton} from '../components/DrawerButton';
import {globalStyles} from '../constants/styles';

const AddProductButton = (props) => (
    <TouchableHighlight {...props}
                        activeOpacity={0.9} 
                        title='Add Product'
                        underlayColor={COLORS.accent} 
                        style={globalStyles.menuButtonContainer}>
        <Ionicons name='add-circle-outline' size={30} color={COLORS.main}/>
    </TouchableHighlight>
)

export const ProductsScreen = ({navigation}) => {
    return (
        <View style={globalStyles.main}>
            <Text>Manage Products Screen</Text>
            {/* <AddProductButton onPress={() => navigation.navigate('editProduct')} 
                              title='Add Product'/> */}
        </View>
    )
};


export const ProductsScreenOptions = ({ route, navigation }) => {
    return {
        headerLeft: (props) => (
            <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
        ),
        headerRight: (props) => (
            <AddProductButton {...props} 
                              onPress={() => navigation.navigate({name: 'editProduct'})} />
        ),
        headerTitle: 'Your products'
  }
}

