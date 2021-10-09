
import { useDispatch, useSelector } from "react-redux";
import {PRODUCTS_MODULE_NAME} from '../store/constants'
import { useNavigation } from "@react-navigation/core";
import { DisplayProduct } from "./DisplayProduct";
import { LocalButton } from "./LocalButton";
import {View, StyleSheet, Text, Platform, TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import React from "react";
import { COLORS } from "../constants/colors";
import {addProductToCart} from '../store/actions/cart';
import {Price} from './Price';

export const ShopProduct =  ({id}) => {
    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[id]);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const details = () => {
        navigation.navigate({name: 'productDetails',params: {productId: id, productName: product?.title}})
    }
    const toCart = () => {
        //productId, productTitle, price, count
        dispatch(addProductToCart(id, product?.title, product?.price, 1))
    }
    const TouchableCmp = (Platform.OS === 'android' && Platform.Version >=21) ? TouchableNativeFeedback  : TouchableOpacity;

    return (
        <View style={styles.productContainer} >
            <TouchableCmp onPress={details}>
                <View>
                    <DisplayProduct product={product}/>
                    <View style={styles.buttonsContainer}>
                        <LocalButton title={'Details'} style={styles.button} onPress={details}/>
                        <Price value={product?.price} highlight={true}/>
                        <LocalButton title={'Cart'} style={styles.button} onPress={toCart}/>
                    </View>
            </View>
            </TouchableCmp>
        </View>

    )
}

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderColor: COLORS.accent,
        borderWidth: 1,
        borderRadius: 5,
        margin: 15,
        flex: 1,
        // height: 300,
        height: '100%',
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 30,
        height: '100%',
        flex: 1,
    }
})