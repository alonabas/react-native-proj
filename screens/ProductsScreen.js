import React from "react";
import {View, Text, Button, StyleSheet, TouchableHighlight} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../constants/colors';

const AddProductButton = (props) => {
    return (
        <TouchableHighlight {...props} 
                            activeOpacity={0.9} 
                            underlayColor={COLORS.accent} 
                            style={styles.buttonContainer}>
                <Ionicons name='ios-restaurant' size={25} color={COLORS.main}/>
        </TouchableHighlight>
    )
}

export const ProductsScreen = ({navigation}) => {
    return (
        <View style={styles.main}>
            <Text>Manage Products Screen</Text>
            <AddProductButton onPress={() => navigation.navigate('editProduct')} title='Add Product'/>
        </View>
    )
};


const styles = StyleSheet.create({
    main: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttonContainer: {
        padding: 14,
        borderRadius: 4,
        margin: 10,
        
    }
})