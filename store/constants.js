export const REDUX_MAIN_MODULE_NAME = 'main-redux-module'
export const MY_PRODUCTS_MODULE_NAME = 'my-products-redux-module'
export const STORE_MODULE_NAME = 'store-redux-module'

export const SAVE_PRODUCT_ACTION = `${MY_PRODUCTS_MODULE_NAME}__save_product`;
export const REMOVE_PRODUCT_ACTION = `${MY_PRODUCTS_MODULE_NAME}__remove_product`;
export const ADD_ORDER_ITEM = `${STORE_MODULE_NAME}__add_item_to_cart`;
export const REMOVE_ITEM_FROM_CART = `${STORE_MODULE_NAME}__remove_item_from_cart`;
export const PLACE_ORDER = `${STORE_MODULE_NAME}__place_an_order`;

export const THIS_USER = 'current';


export const PRICE_OF_ITEMS_IN_CART = (state) => {
    return Object.keys(state?.cart).reduce((sum, element) => {
        const count = state?.cart?.[element] ?? 1;
        const price = +state?.products?.[element]?.price;
        return sum + (count * price)
    }, 0);
}