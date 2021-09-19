import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../constants/colors';

export const LocalButton = ({title='', style={}, textStyle={}, onPress=() => {}}) => {
    return (
        <TouchableOpacity activeOpacity={0.85} 
                          onPress={onPress}
                          style={{...styles.button, ...style}}>
            <Text style={{...styles.text,...textStyle}}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', 
        height: 36, 
        paddingHorizontal: 30,
        backgroundColor: COLORS.main,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        borderRadius: 5,
        overflow: 'hidden'
    },
    text: {
        color: COLORS.ui01
    }
});