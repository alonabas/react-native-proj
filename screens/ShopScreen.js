import React from "react";
import {ScrollView, StyleSheet, Text, TouchableHighlight, View, Animated} from 'react-native';
import {DrawerButton} from '../components/DrawerButton';
import {globalStyles} from '../constants/styles';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../constants/colors';
import {useSelector} from 'react-redux';
import {getListOfShopProducts, numberOfItemsInCart} from '../store/selectors/shop';
import {NoItems} from '../components/NoItems';
import { ShopProduct } from "../components/ShopProduct";


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
            <Text>{localValue}</Text>
        </Animated.View>
    )
}

const ToCartButton = (props) => {
    const count = useSelector(numberOfItemsInCart());
    return (
        <TouchableHighlight {...props}
                            activeOpacity={0.9} 
                            title='Go to cart'
                            underlayColor={'white'} 
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

export const ShopScreen = ({}) => {
    const productIds = useSelector(getListOfShopProducts());
    if (productIds.length === 0) {
        return (
            <NoItems>There are no products</NoItems>
        )
    }
    return (
        <ScrollView >
            {productIds.map(e => (
                <ShopProduct id={e} key={e}/>
            ))}
        </ScrollView>
    )  
}

export const ShopScreenOptions = ({ route, navigation }) => {
  return {
      headerLeft: (props) => (
          <DrawerButton {...props} onPress={() => navigation.openDrawer()}/>
      ),
      headerRight: (props) => (
          <ToCartButton {...props} 
                        onPress={() => navigation.navigate({name: 'cart'})} />
      ),
      headerTitle: 'Shop'
  }
}



const styles = StyleSheet.create({
    countView: {
        bottom: -4,
        right: -4,
        position: 'absolute'
    }
})