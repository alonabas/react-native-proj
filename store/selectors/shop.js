

import {STORE_MODULE_NAME} from '../constants';

export const getListOfShopProducts = () => (state) => Object.keys(state?.[STORE_MODULE_NAME]?.products ?? {})