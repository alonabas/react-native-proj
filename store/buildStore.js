import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { CART_MODULE_NAME, ORDERS_MODULE_NAME, PRODUCTS_MODULE_NAME, REDUX_MAIN_MODULE_NAME } from './constants';
import cartReducer from "./reducers/cart";
import mainReducer from "./reducers/main";
import ordersReducer from "./reducers/orders";
import productsReducer from "./reducers/products";


const allReducers = combineReducers({
    [REDUX_MAIN_MODULE_NAME]: mainReducer,
    [PRODUCTS_MODULE_NAME]: productsReducer,
    [CART_MODULE_NAME]: cartReducer,
    [ORDERS_MODULE_NAME]: ordersReducer,
});
  
const buildStore = () => createStore(allReducers, applyMiddleware(thunk));

export default buildStore;