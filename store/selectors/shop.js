

import {STORE_MODULE_NAME} from '../constants';

export const getListOfShopProducts = () => (state) => Object.keys(state?.[STORE_MODULE_NAME]?.products ?? {})

export const sumOfCart = () => (state) => {
    return Object.keys(state?.[STORE_MODULE_NAME]?.cart).reduce((sum, element) => {
        const count = state?.[STORE_MODULE_NAME]?.cart?.[element] ?? 1;
        const price = +state?.[STORE_MODULE_NAME]?.products?.[element]?.price;
        return sum + (count * price)
    }, 0);
}

export const itemsInCart = () => (state) => {
    return Object.entries(state?.[STORE_MODULE_NAME]?.cart).map(([key,val]) => ({id: key, count: val}));
}

export const numberOfItemsInCart = () => (state) => Object.values(state?.[STORE_MODULE_NAME]?.cart ?? []).reduce((r, e) => r+e, 0)