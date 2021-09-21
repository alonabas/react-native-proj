import {MY_PRODUCTS_MODULE_NAME} from '../constants';

export const getListOfProducts = () => (state) => Object.keys(state?.[MY_PRODUCTS_MODULE_NAME]?.products ?? {})