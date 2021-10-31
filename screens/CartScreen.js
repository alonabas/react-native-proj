import React from "react";
import {View, Text, StyleSheet, ScrollView, Animated, Button} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {sumOfCart, itemsInCart, allCartItems} from '../store/selectors/cart';
import {globalStyles} from '../constants/styles';
import {placeOrder} from '../store/actions/cart';
import { useNavigation } from "@react-navigation/core";
import {CartItem} from '../components/CartItem';
import {Price} from '../components/Price';
import {NoItems} from '../components/NoItems';
import {LocalButton} from '../components/LocalButton';
import {RegularTitle} from '../components/Title';

const Total = ({}) => {
    const totalSum = useSelector(sumOfCart());
    return (
        <View style={styles.cartTotal}>
            <RegularTitle style={styles.paddingOnRight}>Total sum:</RegularTitle>
            <Price value={totalSum} highlight={true}/>
        </View>
    )
}

const PlaceOrder = ({setOrderPlaced=() => {}}) => {
    const dispatch = useDispatch();
    const price = useSelector(sumOfCart());
    const cartItems = useSelector(allCartItems());
    const press = () => {
        dispatch(placeOrder(price, cartItems));
        setOrderPlaced(true);
    }
    return (
        <View style={styles.placeOrderButtonContainer}>
            <LocalButton title={'Place an order'} style={styles.placeOrderButton} onPress={press}/>
        </View>
    )
}

const OrderItems = ({}) => {
    const items = useSelector(itemsInCart());
    return items.map(item => (
        <CartItem key={item} id={item}/>
    ))
}

const OrderPlacedMessage = ({isOrderPlaced}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: isOrderPlaced ? 1 : 0,
            duration: 550,
            useNativeDriver: false
          }).start(({ finished }) => {
            if (isOrderPlaced) navigation.navigate({name: 'orders'})
        });
    }, [isOrderPlaced])

    return (
        <Animated.View style={[styles.orderPlacedView, {opacity: fadeAnim}]}>
            <Text>Your order has been placed</Text>
        </Animated.View>
    )
}

export const CartScreen = ({}) => {
    const [isOrderPlaced, setOrderPlaced] = React.useState(false)

    const items = useSelector(itemsInCart());

    React.useEffect(() => {
        if (isOrderPlaced) { 
            setTimeout(() => setOrderPlaced(false), 2500);
        }
    }, [isOrderPlaced]);

    if (items?.length === 0) {
        return (
            <View style={globalStyles.mainContainer}>
                <OrderPlacedMessage isOrderPlaced={isOrderPlaced}/>
                <NoItems>The cart is empty</NoItems>
            </View>
        )
    }
    return (
        <View style={globalStyles.mainContainer}>
            <Total/>
            <PlaceOrder setOrderPlaced={setOrderPlaced}/>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <OrderItems/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    cartTotal: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paddingOnRight: {
        paddingRight: 10,
    },
    scrollView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    placeOrderButtonContainer: {
        marginVertical: 10,
    },
    placeOrderButton: {
        paddingHorizontal: 10
    },
    orderPlacedView: {
        marginVertical: 10,

    }

})