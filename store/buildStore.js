import mainReducer from "./reducers/main";
import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";

import {combineReducers, createStore} from 'redux';
import {REDUX_MAIN_MODULE_NAME, PRODUCTS_MODULE_NAME, CART_MODULE_NAME} from './constants';

const allReducers = combineReducers({
    [REDUX_MAIN_MODULE_NAME]: mainReducer,
    [PRODUCTS_MODULE_NAME]: productsReducer,
    [CART_MODULE_NAME]: cartReducer
});
  
const buildStore = () => createStore(allReducers);

export default buildStore;