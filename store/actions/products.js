import { Product } from '../../model/product';
import { AUTH_MODULE_NAME, LOAD_PRODUCTS_ACTION, REMOVE_PRODUCT_ACTION, SAVE_PRODUCT_ACTION } from '../constants';

export const loadProducts = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState()?.[AUTH_MODULE_NAME]?.token;

            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/products.json?auth=${token}`, 
                {
                    method: 'GET', 
                    headers: {'Content-Type': 'application/json'},
                }
            );
            if (!response.ok) throw 'Something went wrong!';
            const result = await response.json();
            dispatch({
                type: LOAD_PRODUCTS_ACTION,
                products: Object.keys(result ?? {})
                    .reduce((res, id) => ({...res, [id]: new Product({id, body: result[id]})}), {})
            })
        } catch (e) {
            console.log(e)
            throw e;
        }
    }
}

export function saveProduct(id, payload) {
    return async (dispatch, getState) => {
        try {
            const token = getState()?.[AUTH_MODULE_NAME]?.token;
            const userId = getState()?.[AUTH_MODULE_NAME]?.userId;
            const body = {...payload, owner: userId};
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/products${id ? `/${id}` : ''}.json?auth=${token}`, 
                {
                    method: id ? 'PATCH' : 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) throw 'Something went wrong!';
            const result = await response.json();
            dispatch({
                type: SAVE_PRODUCT_ACTION,
                id: result.name ?? id,
                payload: new Product({id: result.name ?? id, body})
            })
        } catch (e) {
            throw e;
        }
    }
}



export const removeProduct = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, 
                {
                    method: 'DELETE', 
                    headers: {'Content-Type': 'application/json'},
                }
            );
            if (!response.ok) throw 'Something went wrong!';
            dispatch({
                type: REMOVE_PRODUCT_ACTION, id
            })
        } catch (e) {
            throw e;
        }
    }   
}