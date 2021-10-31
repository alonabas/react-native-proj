import { ADD_ORDER_ITEM, PLACE_ORDER, REMOVE_ITEM_FROM_CART } from '../constants';

export const addProductToCart = (productId, productTitle, price, count)  => ({
    type: ADD_ORDER_ITEM,
    productId,
    productTitle,
    price,
    count
})

export const removeFromCart = (productId) => ({
    type: REMOVE_ITEM_FROM_CART,
    id: productId
})

export const placeOrder = (price, items=[]) => ({
    type: PLACE_ORDER,
    price,
    items
});