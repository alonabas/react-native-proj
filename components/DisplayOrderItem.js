import React from "react";
import {View, StyleSheet} from 'react-native';
import {Price} from './Price';
import {RegularTitle, BoldTitle} from './Title';
import { COLORS } from "../constants/colors";

export const DisplayOrderItem = ({item={}, children=''}) => {
    console.log(item)
    return (
        <View style={styles.orderItemContainer}>
            <View style={styles.innerCartItemContainer}>
                <BoldTitle style={styles.textStyle}>{item?.count}</BoldTitle>
                <RegularTitle style={styles.textStyle}>{item?.productTitle}</RegularTitle>
            </View>            
            <View style={[styles.innerCartItemContainer, styles.toEnd]}>
                <Price value={item?.price} highlight={false} style={styles.textStyle}/>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    orderItemContainer : {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.secondary,
    },
    innerCartItemContainer: {
        // flex: 1,
        width: '50%',

        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    toEnd: {
        justifyContent: 'flex-end',
    },
    textStyle: {
        paddingHorizontal: 4
    }
})

