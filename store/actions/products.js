import { Product } from '../../model/product';
import { REMOVE_PRODUCT_ACTION, SAVE_PRODUCT_ACTION, THIS_USER } from '../constants';

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



export const removeProduct = (id) => ({
    type: REMOVE_PRODUCT_ACTION,
    id
})