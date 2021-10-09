import React from "react";
import {StyleSheet, Dimensions, Animated} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import {COLORS} from '../constants/colors';
import { TouchableOpacity } from "react-native-gesture-handler";
import {removeFromCart} from '../store/actions/cart';
import { getItemInCart } from "../store/selectors/cart";
import { DisplayOrderItem } from "./DisplayOrderItem";

export const DisplayCartItem = ({id, children}) => {
    const cartItem = useSelector(getItemInCart(id));
    return (
        <DisplayOrderItem item={cartItem}>
            {children}
        </DisplayOrderItem>    
    )
}

export const CartItem = ({id}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch();
    const remove = () => {
        Animated.timing(fadeAnim, {
            toValue: Dimensions.get('window').width,
            duration: 250,
            useNativeDriver: false
          }).start(({ finished }) => {
            dispatch(removeFromCart(id))
        });
    }
    return (
        <Animated.View style={[{right: fadeAnim}]}>
            <DisplayCartItem id={id}>
                <TouchableOpacity activeOpacity={0.4} 
                                  style={styles.removeButton}
                                  onPress={remove}
                                  title='Remove from card'
                                  underlayColor={COLORS.accent} >
                    <Ionicons name="trash-bin-outline" size={30} color={COLORS.main}/>
                </TouchableOpacity>
            </DisplayCartItem>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    removeButton: {
        marginHorizontal: 10,
        marginVertical: 4
    }
})

