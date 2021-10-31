import React from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LocalButton } from "../components/LocalButton";
import { Price } from '../components/Price';
import { RegularTitle } from '../components/Title';
import { ToCartButton } from '../components/ToCartButton';
import { COLORS } from "../constants/colors";
import { addProductToCart } from '../store/actions/cart';
import { PRODUCTS_MODULE_NAME } from '../store/constants';

export const ProductDetailsScreen = ({route}) => {
    const [itemsToCard, setItemsToCard] = React.useState('1');
    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[route?.params?.productId] ?? {});
    const dispatch = useDispatch();
    const onPress = () => {
        const productId = route?.params?.productId;
        dispatch(addProductToCart(productId, product.title, product.price, +itemsToCard))
    }
    return (
        <ScrollView style={styles.container}>
            <Image style={styles.image}
                   resizeMode={'contain'}
                    source={{
                        uri: product.imageUrl,
                    }}
                />
            <View style={styles.propertyContainer}>
                <RegularTitle style={styles.attrTitle}>Price:</RegularTitle>
                <Price value={product.price} style={styles.attrValue}/>
            </View>
            <View style={styles.propertyContainer}>
                <RegularTitle style={styles.attrTitle}>Description:</RegularTitle>
                <RegularTitle style={styles.attrValue}>{product.description}</RegularTitle>
            </View>
            <View style={{...styles.propertyContainer, ...styles.buttonContainer}}>
                <TextInput value={itemsToCard ?? '1'} 
                           onChangeText={setItemsToCard} 
                           style={styles.countToCartInput}
                           keyboardType={'numeric'}/>
                <LocalButton title={'Add to card'} onPress={onPress}/>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    image: {
        width: '100%',
        height: 200
    },
    propertyContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    attrTitle: {
        paddingRight: 10
    },
    buttonContainer: {
        alignSelf: 'flex-start',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    countToCartInput: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.accent,
        backgroundColor: 'white',
        marginRight: 10,
        width: 'auto',
        textAlign: 'center'
    },
    attrValue: {
        flex: 1,
    }
});

export const ProductDetailsOptions = ({ route, navigation }) => {
    return {
        presentation: 'modal',
        headerTitle: route?.params?.productName ?? 'Unknown product',
        headerRight: (props) => (
            <ToCartButton {...props} 
                          onPress={() => navigation.navigate({name: 'cart'})} />
        ),
  
  }
}