export const REDUX_MAIN_MODULE_NAME = 'main-redux-module'
export const PRODUCTS_MODULE_NAME = 'products-redux-module'
export const CART_MODULE_NAME = 'cart-redux-module'
export const ORDERS_MODULE_NAME = 'orders-redux-module'
export const AUTH_MODULE_NAME = 'auth';

export const SAVE_PRODUCT_ACTION = `${PRODUCTS_MODULE_NAME}__save_product`;
export const REMOVE_PRODUCT_ACTION = `${PRODUCTS_MODULE_NAME}__remove_product`;
export const ADD_ORDER_ITEM = `${CART_MODULE_NAME}__add_item_to_cart`;
export const REMOVE_ITEM_FROM_CART = `${CART_MODULE_NAME}__remove_item_from_cart`;
export const PLACE_ORDER = `${CART_MODULE_NAME}__place_an_order`;
export const LOAD_PRODUCTS_ACTION = `${PRODUCTS_MODULE_NAME}__load_products`;
export const LOAD_ORDERS_ACTION = `${ORDERS_MODULE_NAME}__load_orders`;

export const AUTHENTICATE = `${AUTH_MODULE_NAME}__authenticate`;
export const LOGOUT_ACTION = `${AUTH_MODULE_NAME}__logout`;

export const THIS_USER = 'current';


export const PRICE_OF_ITEMS_IN_CART = (state) => {
    return Object.keys(state?.[CART_MODULE_NAME]?.cart).reduce((sum, element) => {
        const count = state?.[CART_MODULE_NAME]?.cart?.[element] ?? 1;
        const price = +state?.[PRODUCTS_MODULE_NAME]?.products?.[element]?.price;
        return sum + (count * price)
    }, 0);
}

