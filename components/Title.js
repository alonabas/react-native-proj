import { StyleSheet,Text } from "react-native";
import React from "react";


export const RegularTitle = ({style={}, children=''}) => {
    return (
        <Text style={{...styles.textRegular, ...style}}>
            {children}
        </Text>
    )
}

export const BoldTitle = ({style={}, children='', ...other}) => {
    return (
        <Text style={{...styles.textBold, ...style}} {...other}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    textRegular: {
        fontSize: 18,
        fontFamily: 'author-r',
    },
    textBold: {
        fontFamily: 'author-sm',
        fontSize: 22
    }
})