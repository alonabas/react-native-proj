import mainReducer from "./reducers/main";
import productsReducer from "./reducers/products";
import storeReducer from "./reducers/shop";

import {combineReducers, createStore} from 'redux';
import {REDUX_MAIN_MODULE_NAME, PRODUCTS_MODULE_NAME, STORE_MODULE_NAME} from './constants';

const allReducers = combineReducers({
    [REDUX_MAIN_MODULE_NAME]: mainReducer,
    [PRODUCTS_MODULE_NAME]: productsReducer,
    [STORE_MODULE_NAME]: storeReducer
});
  
const buildStore = () => createStore(allReducers);

export default buildStore;