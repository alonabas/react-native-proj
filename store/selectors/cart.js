

import {CART_MODULE_NAME, PRICE_OF_ITEMS_IN_CART} from '../constants';

export const sumOfCart = () => (state) => state?.[CART_MODULE_NAME]?.totalPrice;

export const itemsInCart = () => (state) => {
    return Object.keys(state?.[CART_MODULE_NAME]?.cart);
}

export const getItemInCart = (id) => (state) => state?.[CART_MODULE_NAME]?.cart?.[id] ?? {};

export const numberOfItemsInCart = () => (state) => Object.values(state?.[CART_MODULE_NAME]?.cart ?? []).reduce((r, e) => r+e?.count, 0)

export const getListOfOrders = () => (state) => state?.[CART_MODULE_NAME]?.orders