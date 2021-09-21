import mainReducer from "./reducers/main";
import myProductsReducer from "./reducers/myProducts";
import storeReducer from "./reducers/shop";

import {combineReducers, createStore} from 'redux';
import {REDUX_MAIN_MODULE_NAME, MY_PRODUCTS_MODULE_NAME, STORE_MODULE_NAME} from './constants';

const allReducers = combineReducers({
    [REDUX_MAIN_MODULE_NAME]: mainReducer,
    [MY_PRODUCTS_MODULE_NAME]: myProductsReducer,
    [STORE_MODULE_NAME]: storeReducer
});
  
const buildStore = () => createStore(allReducers);

export default buildStore;