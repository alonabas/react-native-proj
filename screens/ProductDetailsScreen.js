import React from "react";
import {View, Text, ScrollView, StyleSheet, Image, TextInput} from 'react-native';
import { LocalButton } from "../components/LocalButton";
import {useDispatch, useSelector} from 'react-redux';
import {STORE_MODULE_NAME} from '../store/constants';
import { COLORS } from "../constants/colors";
import {addProductToCart} from '../store/actions/shop';
import {OrderItem} from '../model/order';


export const ProductDetailsScreen = ({route}) => {
    const [itemsToCard, setItemsToCard] = React.useState('1');
    const product = useSelector(state => state?.[STORE_MODULE_NAME]?.products?.[route?.params?.productId] ?? {});
    const dispatch = useDispatch();
    const onPress = () => {
        const productId = route?.params?.productId;
        dispatch(addProductToCart(new OrderItem(productId, +itemsToCard)))
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
                <Text style={styles.attrTitle}>Price:</Text>
                <Text>{product.price}</Text>
            </View>
            <View style={styles.propertyContainer}>
                <Text style={styles.attrTitle}>Description:</Text>
                <Text>{product.description}</Text>
            </View>
            <View style={{...styles.propertyContainer, ...styles.buttonContainer}}>
                <TextInput value={itemsToCard ?? '1'} 
                           onChange={setItemsToCard} 
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    attrTitle: {
        paddingRight: 10
    },
    buttonContainer: {
        alignSelf: 'center',
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

    }
});

export const ProductDetailsOptions = ({ route }) => {
    return {
        presentation: 'modal',
        headerTitle: route?.params?.productName ?? 'Unknown product',
  
  }
}