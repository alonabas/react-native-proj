
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';
import React from "react";
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DrawerContent from '../components/DrawerContent';
import { COLORS } from '../constants/colors';
import AuthScreen from '../screens/AuthScreen';
import { CartScreen } from '../screens/CartScreen';
import { EditProductOptions, EditProductScreen } from '../screens/EditProductScreen';
import InitScreen from '../screens/InitScreen';
import { OrdersScreen, OrdersScreenOptions } from '../screens/OrdersScreen';
import { ProductDetailsOptions, ProductDetailsScreen } from '../screens/ProductDetailsScreen';
import { ProductsScreen, ProductsScreenOptions } from '../screens/ProductsScreen';
import { ShopScreen, ShopScreenOptions } from '../screens/ShopScreen';
import { logout } from '../store/actions/auth';
import { AUTH_MODULE_NAME } from '../store/constants';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const hideHeaderOptions = { 
  headerShown: false 
}

const basicNavigationOptions = {
  headerTintColor: COLORS.main,
  headerTitleStyle: {
    color: 'black',
    fontFamily: 'author-r',
    fontSize: 26
  },
  headerTitleAlign: 'center',
  headerBackTitleStyle: {
    fontFamily: 'author-r',
    fontSize: 18
  }
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

const OrdersIcon = (drawerConfig) => (
  <Ionicons name={Platform.OS  === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.color}/>
);

const CartIcon = (drawerConfig) => (
  <Ionicons name={Platform.OS  === 'android' ? 'md-cart': 'ios-cart'} size={23} color={drawerConfig.color}/>
);

const StoreIcon = (drawerConfig) => (
  <MaterialIcons name={'store'} size={23} color={drawerConfig.color}/>
);

const AppNavigator = ({}) => {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}
                          screenOptions={{drawerLabelStyle: {fontFamily: 'author-r', fontSize: 20}}}
                          >
          <Drawer.Screen name="shopNav"
                         options={{title:'Shop', drawerIcon: CartIcon, ...hideHeaderOptions}} 
                         component={ShopStackNavigator} />
          <Drawer.Screen name="ordersNav" 
            
                         options={{title: 'Orders', drawerIcon: OrdersIcon , ...hideHeaderOptions}} 
                         component={OrdersStackNavigator} />
          <Drawer.Screen name="productsNav" 
                         options={{title: 'Manage Products', drawerIcon: StoreIcon,...hideHeaderOptions}} 
                         component={ProductsStackNavigator} />
        </Drawer.Navigator>
      );
}

const AuthNavigator = ({}) => (
  <Stack.Navigator screenOptions={basicNavigationOptions}>
    <Stack.Screen name="auth-screen" 
                  options={{title: 'Authorize'}}
                  component={AuthScreen}/>
  </Stack.Navigator>
);


const screenListeners = (logoutFn) => ({ navigation }) => ({
  state: async (e) => {
    
    // Do something with the state
    // console.log('state changed', e.data);
    // return;
    const routes = e?.data?.state?.routes;
    const currentRoute = routes?.[routes.length - 1]?.['name']
    if (currentRoute && currentRoute !== 'init' && currentRoute !== 'auth') {
      const value = await AsyncStorage.getItem('userData');
      if (value === null) logoutFn()
      const {idToken, localId, expiration} = JSON.parse(value);
      console.log(moment.utc(expiration))
      console.log(moment.utc())
      if (!idToken || !localId || moment().isAfter(moment.utc(expiration))){
        logoutFn()
      }
    }
  }
})

export const MainNavigator = ({}) => {
    const {userId, isInit} = useSelector(state => state?.[AUTH_MODULE_NAME]);
    const dispatch = useDispatch();
    const logoutFn = () => dispatch(logout())
    return (
        <Stack.Navigator screenOptions={hideHeaderOptions} 
                         screenListeners={screenListeners(logoutFn)}>
          {isInit && <Stack.Screen name="init" component={InitScreen} />}
          {!isInit && !userId && <Stack.Screen name="auth" component={AuthNavigator} />}
          {userId && !isInit && <Stack.Screen name="app" component={AppNavigator} />}
        </Stack.Navigator>
      );
}