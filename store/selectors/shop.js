

import {STORE_MODULE_NAME, PRICE_OF_ITEMS_IN_CART} from '../constants';

export const sumOfCart = () => (state) => PRICE_OF_ITEMS_IN_CART(state);

export const itemsInCart = () => (state) => {
    return Object.entries(state?.[STORE_MODULE_NAME]?.cart).map(([key,val]) => ({id: key, count: val}));
}

export const numberOfItemsInCart = () => (state) => Object.values(state?.[STORE_MODULE_NAME]?.cart ?? []).reduce((r, e) => r+e, 0)

export const getListOfOrders = () => (state) => state?.[STORE_MODULE_NAME]?.orders