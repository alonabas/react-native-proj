import { AUTH_MODULE_NAME, PRODUCTS_MODULE_NAME } from '../constants';

export const getListOfMyProducts = () => (state) => Object.keys(state?.[PRODUCTS_MODULE_NAME]?.products ?? [])
.filter(p => state?.[PRODUCTS_MODULE_NAME]?.products?.[p]?.owner === state?.[AUTH_MODULE_NAME]?.userId);

export const getListOfShopProducts = () => (state) => Object.keys(state?.[PRODUCTS_MODULE_NAME]?.products ?? [])
.filter(p => state?.[PRODUCTS_MODULE_NAME]?.products?.[p]?.owner !== state?.[AUTH_MODULE_NAME]?.userId);
