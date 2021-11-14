import { Product } from '../../model/product';
import { LOAD_PRODUCTS_ACTION, REMOVE_PRODUCT_ACTION, SAVE_PRODUCT_ACTION, THIS_USER } from '../constants';

export const loadProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/products.json`, 
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
    const body = {...payload, owner: THIS_USER};
    return async dispatch => {
        try {
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/products${id ? `/${id}` : ''}.json`, 
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
                id: result.name,
                payload: new Product({id: result.name, body})
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
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/products/${id}.json`, 
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