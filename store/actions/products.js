import { REMOVE_PRODUCT_ACTION, SAVE_PRODUCT_ACTION } from '../constants';

export const saveProduct = (id, payload) => ({
    type: SAVE_PRODUCT_ACTION,
    id,
    payload
})

export const removeProduct = (id) => ({
    type: REMOVE_PRODUCT_ACTION,
    id
})