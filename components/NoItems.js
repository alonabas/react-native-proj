import React from "react";
import {View, StyleSheet, Text} from 'react-native';
import {RegularTitle} from '../components/Title';

export const NoItems = ({children}) => {
    return (
        <View style={styles.view}>
            <RegularTitle>{children}</RegularTitle>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
    
});