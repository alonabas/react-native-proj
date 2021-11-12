
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Alert, Animated, Dimensions, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from '../constants/colors';
import { removeProduct } from '../store/actions/products';
import { PRODUCTS_MODULE_NAME } from '../store/constants';
import { DisplayProduct } from './DisplayProduct';
import { LocalButton } from "./LocalButton";
import { Price } from "./Price";

export const MyProduct =  ({id}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[id]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    

    const edit = () => {
        navigation.navigate({name: 'editProduct',params: {productId: id, productName: product?.title}})
    }

    
    const remove = () => {
        Animated.timing(fadeAnim, {
            toValue: Dimensions.get('window').width,
            duration: 250,
            useNativeDriver: false
          }).start(({ finished }) => {
            dispatch(removeProduct(id));
        });
    }
    const askRemove = () => {
        Alert.alert(
            `Remove ${product?.title}`,
            `Are you sure you want to remove the product?`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { 
                  text: "Remove", 
                  style: "destructive", 
                  onPress: () => remove() 
                }
            ]
          );
    }
    return (
        <Animated.View style={[styles.productContainer, {right: fadeAnim}]}>
            <DisplayProduct product={product}/>
            <View style={styles.buttonsContainer}>
                <LocalButton title={'Edit'} style={styles.button} onPress={edit}/>
                <Price value={product?.price} highlight={true}/>
                <LocalButton title={'Delete'} style={styles.button} onPress={askRemove}/>
            </View>
        </Animated.View>

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