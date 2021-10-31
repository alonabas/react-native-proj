import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Animated, Text, View, Dimensions } from "react-native";
import { LocalButton } from "./LocalButton";
import {OrderContext} from '../contexts/OrderContext';
import {DisplayOrderItem} from './DisplayOrderItem';

const LocalAnimatedButton = ({style={}, title='', onPress=() => {}, animatedValue}) => {
    const baseAnimHeight = React.useRef(new Animated.Value(40)).current;
    const animOne = React.useRef(new Animated.Value(1)).current;

    // const fadeAnim = React.useRef(new Animated.Value(1)).current;
    // React.useEffect(() => {
    //     Animated.subtract(baseAnim - animatedValue, {
    //         toValue: +isShown,
    //         duration: 250,
    //         useNativeDriver: false
    //       }).start(({ finished }) => {
    //     });
    // }, [isShown]);
    // console.log(fadeAnim)
    return (
        <Animated.View style={[styles.moreButton, {height: Animated.multiply(baseAnimHeight, Animated.subtract(animOne, animatedValue))}]}>
            <LocalButton title={title} 
                         onPress={onPress}/>
        </Animated.View>
    )
}


const OrderItems = ({}) => {
    const {order} = React.useContext(OrderContext);
    return (
        <View>
            {(order?.items ?? []).map(item => (
                <DisplayOrderItem item={item} key={item?.id}/>
            ))}
        </View>
    )
}

export const OrderDetails = ({}) => {
    const [showDetails, setShowDetails] = React.useState(false)
    const topAnim = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toggle = (isToShow) => {
        if (isToShow) setShowDetails(o => !o);
        Animated.timing(topAnim, {
            toValue: +isToShow,
            duration: 250,
            useNativeDriver: false
          }).start(({ finished }) => {
            if (!isToShow) setShowDetails(o => !o);
        });
    }
    return (
        <View style={styles.detailsContainer}>
            <LocalAnimatedButton title={'More'} 
                                 isShown={!showDetails}
                                 animatedValue={topAnim}
                                 onPress={() => toggle(true)}/>
            {showDetails &&
                <Animated.View style={[styles.orderContainer, {transform:[ {scale:topAnim}]}]}> 
                    <OrderItems/>
                    <LocalButton title={'Hide'} style={styles.moreButton}
                                 onPress={() => toggle(false)}/>
                </Animated.View>
            }
        </View>
        

    )
}

const styles = StyleSheet.create({
    detailsContainer: {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: 'auto'
    },
    orderContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginHorizontal: 10,
        marginVertical: 5,
        position: 'relative',
        top: 0,
    },
    moreButton: {
        alignSelf: 'center',
        overflow: 'hidden',
    },
})