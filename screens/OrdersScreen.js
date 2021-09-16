import React from "react";
import {View, Text} from 'react-native';
import {DrawerButton} from '../components/DrawerButton';


export const OrdersScreenOptions = ({navigation}) => ({
    headerLeft: (props) => (
        <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
    ),
    headerTitle: 'Orders'
});

export const OrdersScreen = ({}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Orders Screen</Text>
        </View>
    )
};