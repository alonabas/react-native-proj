import React from "react";
import {View, Text} from 'react-native';

export const EditProductScreen = ({}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Edit Product Screen</Text>
        </View>
    )
};

export const EditProductOptions = ({ route }) => {
    console.log(route)
    return {
        headerTitle: route?.params?.productId ? `Edit ${route?.params?.productId}` : `New Product`,
  }
}