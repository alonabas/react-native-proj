import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DataLoading, { DataLoadingContainer } from '../components/DataLoading';
import { DrawerButton } from '../components/DrawerButton';
import { NoItems } from "../components/NoItems";
import { OrderDetails } from '../components/OrderDetails';
import { Price } from "../components/Price";
import { RegularTitle } from "../components/Title";
import { COLORS } from "../constants/colors";
import { globalStyles } from "../constants/styles";
import { OrderContext } from '../contexts/OrderContext';
import * as orderActions from '../store/actions/orders';
import { getSortedListOfOrders } from '../store/selectors/orders';

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
                    <RegularTitle>Order ID {order.id}</RegularTitle>
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
    const {setError, error, setLoading, isLoading} = DataLoading({});
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const loadOrders = React.useCallback(() => {
        setLoading(true);
        dispatch(orderActions.loadOrders())
            .then(() => setLoading(false))
            .catch(e => setError(e));
    }, [])
    
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadOrders);
        loadOrders()
        return unsubscribe;
    },[]);
    return (
        <DataLoadingContainer isLoading={isLoading} error={error}>
            <ScrollView contentContainerStyle={{...globalStyles.mainContainer, ... styles.localMainContainer}}>
                <Orders/>
            </ScrollView>
        </DataLoadingContainer>
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
        paddingBottom: 10,
        flexWrap: 'wrap'
    },
    
    localMainContainer: {
        // width: '100%'
        alignItems: 'stretch'
    }
})