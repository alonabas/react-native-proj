
import { useDispatch, useSelector } from "react-redux";
import {STORE_MODULE_NAME} from '../store/constants'
import { useNavigation } from "@react-navigation/core";
import { DisplayProduct } from "./DisplayProduct";
import { LocalButton } from "./LocalButton";
import {View, StyleSheet, Text} from 'react-native';
import React from "react";
import { COLORS } from "../constants/colors";

export const ShopProduct =  ({id}) => {
    const product = useSelector(state => state?.[STORE_MODULE_NAME]?.products?.[id]);
    const navigation = useNavigation();
    
    const details = () => {
        navigation.navigate({name: 'productDetails',params: {productId: id, productName: product?.title}})
    }
    const toCart = () => {
        console.log('To cart')
    }
    return (
        <View style={styles.productContainer}>
            <DisplayProduct product={product}/>
            <View style={styles.buttonsContainer}>
                <LocalButton title={'Details'} style={styles.button} onPress={details}/>
                <Text>{product?.price}</Text>
                <LocalButton title={'Cart'} style={styles.button} onPress={toCart}/>
            </View>
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