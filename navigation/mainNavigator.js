
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ShopScreen} from '../screens/ShopScreen';
import {OrdersScreen} from '../screens/OrdersScreen';
import {ProductsScreen} from '../screens/ProductsScreen';
import React from "react";
import {CartScreen} from '../screens/CartScreen';
import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';
import {EditProductScreen, EditProductOptions} from '../screens/EditProductScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const NativeStack = createNativeStackNavigator();

const defaultOptions = { headerShown: false }

const ShopStackNavigator = ({}) => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="shop" 
                          component={ShopScreen}
                          options={{title: 'Shop'}}/>
            <Stack.Screen name="cart" 
                          component={CartScreen} 
                          options={{title: 'Shopping cart'}}/>
            <Stack.Screen name="productDetails" 
                          component={ProductDetailsScreen} 
                          options={{title: 'Product details'}}
                          />
        </Stack.Navigator>
      );
}

const ProductsStackNavigator = ({}) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="listProducts" 
                          options={{title: 'Your products'}}
                          component={ProductsScreen}/>
            <Stack.Screen name="editProduct" 
                          options={EditProductOptions}
                          component={EditProductScreen} />
        </Stack.Navigator>
      );

}


export const DrawerNavigator = ({}) => {
    return (
        <Drawer.Navigator screenOptions={defaultOptions}>
          <Drawer.Screen name="shopNav" 
                         options={{title:'Shop'}} 
                         component={ShopStackNavigator} />
          <Drawer.Screen name="orders" 
                         options={{title: 'Orders'}} 
                         component={OrdersScreen} />
          <Drawer.Screen name="productsNav" 
                         options={{title: 'Manage Products'}} 
                         component={ProductsStackNavigator} />
        </Drawer.Navigator>
      );
}

export const MainNavigator = ({}) => {
    return (
        <NativeStack.Navigator screenOptions={defaultOptions}>
          <NativeStack.Screen name="drawerNav" component={DrawerNavigator} />
        </NativeStack.Navigator>
      );
}