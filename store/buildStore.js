import mainReducer from "./reducers/main";
import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";
import ordersReducer from "./reducers/orders";

import {combineReducers, createStore} from 'redux';
import {REDUX_MAIN_MODULE_NAME, PRODUCTS_MODULE_NAME, CART_MODULE_NAME, ORDERS_MODULE_NAME} from './constants';

const allReducers = combineReducers({
    [REDUX_MAIN_MODULE_NAME]: mainReducer,
    [PRODUCTS_MODULE_NAME]: productsReducer,
    [CART_MODULE_NAME]: cartReducer,
    [ORDERS_MODULE_NAME]: ordersReducer,
});
  
const buildStore = () => createStore(allReducers);

export default buildStore;