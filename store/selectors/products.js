import {PRODUCTS_MODULE_NAME, THIS_USER} from '../constants';

export const getListOfMyProducts = () => (state) => Object.keys(state?.[PRODUCTS_MODULE_NAME]?.products ?? [])
.filter(p => state?.[PRODUCTS_MODULE_NAME]?.products?.[p]?.owner === THIS_USER);

export const getListOfShopProducts = () => (state) => Object.keys(state?.[PRODUCTS_MODULE_NAME]?.products ?? [])
.filter(p => state?.[PRODUCTS_MODULE_NAME]?.products?.[p]?.owner !== THIS_USER);
