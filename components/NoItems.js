import React from "react";
import {View, StyleSheet, Text} from 'react-native';

export const NoItems = ({children}) => {
    return (
        <View style={styles.view}>
            <Text>{children}</Text>
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