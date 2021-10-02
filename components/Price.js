import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants/colors";

export const Price = ({value, style={}, highlight=false}) => {
    return (
        <View style={{...styles.priceCntainer, ...style}}>
            <Text style={{...styles.priceText, ...(highlight ? {} : styles.regular)}}>
                {value}$
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    priceCntainer: {
        paddingHorizontal: 5,
    },
    priceText: {
        color: COLORS.main,
        fontSize: 20,
        fontFamily: 'author-sm',
        // fontWeight: '400',
    },
    regular: {
        fontFamily: 'author-r',
        color: 'black'
    }
})