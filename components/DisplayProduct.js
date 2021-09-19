import { useNavigation } from "@react-navigation/core";
import React from "react";
import {View, StyleSheet, Text, ImageBackground, Animated, Dimensions} from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/colors";
import {PRODUCTS_MODULE_NAME} from '../store/constants'
import { LocalButton } from "./LocalButton";
import {removeProduct} from '../store/actions/products';

    
export const DisplayProduct = ({id}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const product = useSelector(state => state?.[PRODUCTS_MODULE_NAME]?.products?.[id])
    const navigation = useNavigation();
    const dispatch = useDispatch();
    

    const edit = () => {
        navigation.navigate({name: 'editProduct',params: {productId: id, productName: product?.title}})
    }
    const remove = () => {
        Animated.timing(fadeAnim, {
            toValue: Dimensions.get('window').width,
            duration: 250,
            useNativeDriver: true
          }).start(({ finished }) => {
            dispatch(removeProduct(id));
        });
    }
    return (
        <Animated.View
        style={[
          styles.productContainer,
          {
            // Bind opacity to animated value
            right: fadeAnim
          }
        ]}
      >
            <View style={styles.imageContainer}>
                <ImageBackground source={{uri: product.imageUrl}} 
                                 style={styles.image} 
                                 resizeMode={'cover'}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text} numberOfLines={1}>{product.title}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.buttonsContainer}>
                <LocalButton title={'Edit'} style={styles.button} onPress={edit}/>
                <Text>{product?.price}</Text>
                <LocalButton title={'Delete'} style={styles.button} onPress={remove}/>
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
    },
    image: {
        height: '100%',
        position: 'relative',
        width: '100%',
        justifyContent:'flex-start',
        alignItems: 'center',
        minHeight: 100,
    },
    textContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',        
        paddingHorizontal: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 5,
        width: '100%',
    },
    text: {
        color: COLORS.ui01,
        fontSize: 20,
    },
    imageContainer: {
        flex: 1,
        // height: ,
        marginBottom: 8,
        
    }
})