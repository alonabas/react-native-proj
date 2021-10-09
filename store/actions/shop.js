import {ADD_ORDER_ITEM, REMOVE_ITEM_FROM_CART, PLACE_ORDER} from '../constants';

export const addProductToCart = (productId, count)  => ({
    type: ADD_ORDER_ITEM,
    productId,
    count
})

export const removeFromCart = (productId) => ({
    type: REMOVE_ITEM_FROM_CART,
    id: productId
})

export const placeOrder = (price) => ({
    type: PLACE_ORDER,
    price
});