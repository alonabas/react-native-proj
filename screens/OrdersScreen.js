import React from "react";
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import { useSelector } from "react-redux";
import {DrawerButton} from '../components/DrawerButton';
import { globalStyles } from "../constants/styles";
import {getListOfOrders} from '../store/selectors/shop';
import { LocalButton } from "../components/LocalButton";
import { COLORS } from "../constants/colors";
import {OrderDetails} from '../components/OrderDetails';
import {OrderContext} from '../contexts/OrderContext';
import moment from 'moment';

export const OrdersScreenOptions = ({navigation}) => ({
    headerLeft: (props) => (
        <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
    ),
    headerTitle: 'Orders'
});

const Order = ({order}) => {
    return (
        <OrderContext.Provider value={{order}}>
            <View style={styles.orderContainer}>
                <View style={styles.row}>
                    <Text>{order.price}</Text>
                    <Text>{moment.unix(order.date).format("MM/DD/YYYY HH:mm")}</Text>
                </View>
                <OrderDetails/>
            </View>
        </OrderContext.Provider>
    )
}

const Orders = ({}) => {
    const orders = useSelector(getListOfOrders());
    return orders.map(order => <Order key={order?.date} order={order}/>)
}

export const OrdersScreen = ({}) => {
    return (
        <ScrollView contentContainerStyle={{...globalStyles.mainContainer, ... styles.localMainContainer}}>
            <Orders/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    orderContainer: {
        borderColor: COLORS.accent,
        borderRadius: 4,
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'white'

        // alignItems:''
        // alignItems: ,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    localMainContainer: {
        // width: '100%'
        alignItems: 'stretch'
    }
})