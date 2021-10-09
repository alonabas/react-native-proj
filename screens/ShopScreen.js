import React from "react";
import {ScrollView, StyleSheet} from 'react-native';
import {DrawerButton} from '../components/DrawerButton';
import {useSelector} from 'react-redux';
import {numberOfItemsInCart} from '../store/selectors/shop';
import {getListOfShopProducts} from '../store/selectors/products';
import {NoItems} from '../components/NoItems';
import { ShopProduct } from "../components/ShopProduct";
import {ToCartButton} from '../components/ToCartButton';


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



