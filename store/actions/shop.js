import {ADD_ORDER_ITEM} from '../constants';

export const addProductToCart = (orderItem)  => ({
    type: ADD_ORDER_ITEM,
    orderItem
})