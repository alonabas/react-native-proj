import React from "react";
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import { COLORS } from "../constants/colors";
import {BoldTitle} from './Title';
    
export const DisplayProduct = ({product}) => {
    return (
        <View style={styles.imageContainer}>
            <ImageBackground source={{uri: product.imageUrl}} 
                             style={styles.image} 
                             resizeMode={'cover'}>
                <View style={styles.textContainer}>
                    <BoldTitle style={styles.text} numberOfLines={1}>{product.title}</BoldTitle>
                </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        height: '100%',
        position: 'relative',
        width: '100%',
        justifyContent:'flex-start',
        alignItems: 'center',
        minHeight: 150,
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
        fontSize: 24,
    },
    imageContainer: {
        flex: 1,
        // height: ,
        marginBottom: 8,
        
    }
})