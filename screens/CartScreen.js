import React from "react";
import {View, Text, StyleSheet, ScrollView, Animated, Button} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {sumOfCart, itemsInCart} from '../store/selectors/shop';
import {globalStyles} from '../constants/styles';
import {placeOrder} from '../store/actions/shop';
import { useNavigation } from "@react-navigation/core";
import {OrderItem} from '../components/OrderItem';
import {Price} from '../components/Price';

const Total = ({}) => {
    const totalSum = useSelector(sumOfCart());
    return (
        <View style={styles.cartTotal}>
            <Text style={styles.paddingOnRight}>Total sum:</Text>
            <Price value={totalSum} highlight={true}/>
        </View>
    )
}

const PlaceOrder = ({setOrderPlaced=() => {}}) => {
    const dispatch = useDispatch();
    const press = () => {
        dispatch(placeOrder());
        setOrderPlaced(true);
    }
    return (
        <View style={styles.placeOrderButtonContainer}>
            <Button title='Place an order' onPress={press} style={styles.placeOrderButton}/>
        </View>
    )
}

const OrderItems = ({}) => {
    const items = useSelector(itemsInCart());
    return items.map(item => (
        <OrderItem key={item.id} item={item}/>
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
                <Text>The cart is empty</Text>
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