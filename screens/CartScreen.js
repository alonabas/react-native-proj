import React from "react";
import {View, Text, StyleSheet, ScrollView, Dimensions, Animated, Button} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {sumOfCart, itemsInCart} from '../store/selectors/shop';
import {Ionicons} from "@expo/vector-icons";
import {STORE_MODULE_NAME} from '../store/constants';
import {COLORS} from '../constants/colors';
import {globalStyles} from '../constants/styles';
import { TouchableOpacity } from "react-native-gesture-handler";
import {removeFromCart, placeOrder} from '../store/actions/shop';

const Total = ({}) => {
    const totalSum = useSelector(sumOfCart());
    return (
        <View style={styles.cartTotal}>
            <Text style={styles.paddingOnRight}>Total sum:</Text>
            <Text>{totalSum}</Text>
        </View>
    )
}

const PlaceOrder = ({}) => {
    const dispatch = useDispatch();
    const press = () => {
        dispatch(placeOrder());
        alert('Your order has been placed!');
    }
    return (
        <View style={styles.placeOrderButtonContainer}>
            <Button title='Place an order' onPress={press} style={styles.placeOrderButton}/>
        </View>
    )
}

const OrderItem = ({item={}}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const product = useSelector(state => state?.[STORE_MODULE_NAME]?.products?.[item?.id]) ?? {};

    const dispatch = useDispatch();
    const remove = () => {
        Animated.timing(fadeAnim, {
            toValue: Dimensions.get('window').width,
            duration: 250,
            useNativeDriver: false
          }).start(({ finished }) => {
            dispatch(removeFromCart(item?.id))
        });
    }
    return (
        <Animated.View style={[styles.orderItemContainer, {right: fadeAnim}]}>
            <View style={styles.innerCartItemContainer}>
                <Text style={styles.textStyle}>{item.count}</Text>
                <Text style={styles.textStyle}>{product.title}</Text>
            </View>            
            <View style={[styles.innerCartItemContainer, styles.toEnd]}>
                <Text style={styles.textStyle}>{product.price}</Text>
                <TouchableOpacity activeOpacity={0.4} 
                                  style={styles.removeButton}
                                  onPress={remove}
                                  title='Remove from card'
                                  underlayColor={COLORS.accent} >
                    <Ionicons name="trash-bin-outline" size={30} color={COLORS.main}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const OrderItems = ({}) => {
    const items = useSelector(itemsInCart());
    return items.map(item => (
        <OrderItem key={item.id} item={item}/>
    ))
}

export const CartScreen = ({}) => {
    const items = useSelector(itemsInCart());
    if (items?.length === 0) {
        return (
            <View style={styles.mainContainer}>
                <Text>The cart is empty</Text>
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <Total/>
            <PlaceOrder/>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <OrderItems/>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    cartTotal: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paddingOnRight: {
        paddingRight: 10,
    },
    orderItemContainer : {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.secondary,
    },
    innerCartItemContainer: {
        // flex: 1,
        width: '50%',

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    toEnd: {
        justifyContent: 'flex-end',
    },
    textStyle: {
        paddingHorizontal: 4
    },
    scrollView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    removeButton: {
        marginHorizontal: 10,
        marginVertical: 4
    },
    placeOrderButtonContainer: {
        marginVertical: 10,
    },
    placeOrderButton: {
        paddingHorizontal: 10
    }

})