
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ShopScreen, ShopScreenOptions} from '../screens/ShopScreen';
import {OrdersScreen, OrdersScreenOptions} from '../screens/OrdersScreen';
import {ProductsScreen, ProductsScreenOptions} from '../screens/ProductsScreen';
import React from "react";
import {CartScreen} from '../screens/CartScreen';
import {ProductDetailsScreen, ProductDetailsOptions} from '../screens/ProductDetailsScreen';
import {EditProductScreen, EditProductOptions} from '../screens/EditProductScreen';
import {COLORS} from '../constants/colors';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const hideHeaderOptions = { 
  headerShown: false 
}

const basicNavigationOptions = {
  headerTintColor: COLORS.main,
  headerTitleStyle: {
    color: 'black'
  },
  headerTitleAlign: 'center'
}

const ShopStackNavigator = ({}) => {
    return (
        <Stack.Navigator screenOptions={basicNavigationOptions}>
            <Stack.Screen name="shop" 
                          component={ShopScreen}
                          options={ShopScreenOptions}/>
            <Stack.Screen name="cart" 
                          component={CartScreen} 
                          options={{title: 'Shopping cart'}}/>
            <Stack.Screen name="productDetails" 
                          component={ProductDetailsScreen} 
                          options={ProductDetailsOptions}
                          />
        </Stack.Navigator>
      );
}

const ProductsStackNavigator = ({}) => {
    return (
        <Stack.Navigator screenOptions={basicNavigationOptions}>
            <Stack.Screen name="listProducts" 
                          options={ProductsScreenOptions}
                          component={ProductsScreen}/>
            <Stack.Screen name="editProduct" 
                          options={EditProductOptions}
                          component={EditProductScreen} />
        </Stack.Navigator>
      );
}

const OrdersStackNavigator = ({}) => (
  <Stack.Navigator screenOptions={basicNavigationOptions}>
    <Stack.Screen name="orders" 
                  options={OrdersScreenOptions}
                  component={OrdersScreen}/>
  </Stack.Navigator>
);


export const MainNavigator = ({}) => {
    return (
        <Drawer.Navigator>
          <Drawer.Screen name="shopNav" 
                         options={{title:'Shop', ...hideHeaderOptions}} 
                         component={ShopStackNavigator} />
          <Drawer.Screen name="ordersNav" 
                         options={{title: 'Orders', ...hideHeaderOptions}} 
                         component={OrdersStackNavigator} />
          <Drawer.Screen name="productsNav" 
                         options={{title: 'Manage Products', ...hideHeaderOptions}} 
                         component={ProductsStackNavigator} />
        </Drawer.Navigator>
      );
}

// export const MainNavigator = ({}) => {
//     return (
//         <NativeStack.Navigator screenOptions={defaultOptions}>
//           <NativeStack.Screen name="drawerNav" component={DrawerNavigator} />
//         </NativeStack.Navigator>
//       );
// }