import {PRODUCTS_MODULE_NAME} from '../constants';

export const getListOfProducts = () => (state) => Object.keys(state?.[PRODUCTS_MODULE_NAME]?.products ?? {})