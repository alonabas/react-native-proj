import React from "react";
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import {PRODUCTS_MODULE_NAME} from '../store/constants';
import {COLORS} from '../constants/colors';
import { TouchableOpacity } from "react-native-gesture-handler";
import {removeFromCart, placeOrder} from '../store/actions/shop';
import {Price} from './Price';
import {RegularTitle, BoldTitle} from './Title';

export const DisplayOrderItem = ({item={}, children}) => {
    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[item?.id]) ?? {};

    return (
        <View style={styles.orderItemContainer}>
            <View style={styles.innerCartItemContainer}>
                <BoldTitle style={styles.textStyle}>{item.count}</BoldTitle>
                <RegularTitle style={styles.textStyle}>{product.title}</RegularTitle>
            </View>            
            <View style={[styles.innerCartItemContainer, styles.toEnd]}>
                <Price value={product.price} highlight={false} style={styles.textStyle}/>
                {children}
            </View>
        </View>
    )
}

export const OrderItem = ({item={}}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
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
        <Animated.View style={[{right: fadeAnim}]}>
            <DisplayOrderItem item={item}>
                <TouchableOpacity activeOpacity={0.4} 
                                  style={styles.removeButton}
                                  onPress={remove}
                                  title='Remove from card'
                                  underlayColor={COLORS.accent} >
                    <Ionicons name="trash-bin-outline" size={30} color={COLORS.main}/>
                </TouchableOpacity>
            </DisplayOrderItem>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
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
    removeButton: {
        marginHorizontal: 10,
        marginVertical: 4
    }
})

