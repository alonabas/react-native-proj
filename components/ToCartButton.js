import React from "react";
import {View, StyleSheet, Animated, TouchableHighlight} from 'react-native';
import {useSelector} from 'react-redux';
import {numberOfItemsInCart} from '../store/selectors/cart';
import { RegularTitle } from "../components/Title";
import { COLORS } from "../constants/colors";
import { globalStyles } from "../constants/styles";
import {Ionicons} from "@expo/vector-icons";

const Count = ({value}) => {
    const [localValue, setLocalValue] = React.useState(value)
    const jump = React.useRef(new Animated.Value(1)).current;

    React.useEffect(() => {
        Animated.timing(jump, {
            toValue: 2,
            duration: 250,
            useNativeDriver: false
          }).start(({ finished }) => {
            setLocalValue(value);
        });

    }, [value]);
    React.useEffect(() => {
        Animated.timing(jump, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
          }).start(({ finished }) => {
            
        });

    }, [localValue]);

    return (
        <Animated.View style={[styles.countView, {transform: [{scale: jump}]}]}>
            <RegularTitle style={styles.countItems}>{localValue}</RegularTitle>
        </Animated.View>
    )
}

export const ToCartButton = (props) => {
    const count = useSelector(numberOfItemsInCart());
    return (
        <TouchableHighlight {...props}
                            activeOpacity={0.9} 
                            title='Go to cart'
                            underlayColor={COLORS.accent} 
                            style={globalStyles.menuButtonContainer}>
            <View>                    
                <Ionicons name='cart-outline' size={25} color={COLORS.main}/>
                {count > 0 &&
                    <Count value={count}/>
                }
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    countView: {
        bottom: -6,
        right: -6,
        position: 'absolute'
    },
    countItems: {
        fontFamily: 'author-sm',
    }
})