import React from "react";
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import { useSelector } from "react-redux";
import {DrawerButton} from '../components/DrawerButton';
import { globalStyles } from "../constants/styles";
import {getSortedListOfOrders} from '../store/selectors/orders';
import { RegularTitle } from "../components/Title";
import { COLORS } from "../constants/colors";
import {OrderDetails} from '../components/OrderDetails';
import {OrderContext} from '../contexts/OrderContext';
import moment from 'moment';
import { NoItems } from "../components/NoItems";
import { Price } from "../components/Price";

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
                    <RegularTitle>Order ID {order.date}</RegularTitle>
                    <Price value={order?.price} highlight={true}/>
                    <RegularTitle>{moment.unix(order.date).format("MM/DD/YYYY HH:mm")}</RegularTitle>
                </View>
                <OrderDetails/>
            </View>
        </OrderContext.Provider>
    )
}

const Orders = ({}) => {
    const orders = useSelector(getSortedListOfOrders());
    if (orders.length > 0) {
        return orders.map(order => <Order key={order?.date} order={order}/>)
    }
    return (
        <NoItems>You haven't placed any order yet</NoItems>
    )
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
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    
    localMainContainer: {
        // width: '100%'
        alignItems: 'stretch'
    }
})