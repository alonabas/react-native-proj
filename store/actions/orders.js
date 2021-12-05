import moment from 'moment';
import { Order } from "../../model/order";
import { AUTH_MODULE_NAME, LOAD_ORDERS_ACTION, PLACE_ORDER } from '../constants';

export const loadOrders = () => {
    return async (dispatch, getState) => {
        try {
            const userId = getState()?.[AUTH_MODULE_NAME]?.userId;
            const token = getState()?.[AUTH_MODULE_NAME]?.token;

            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, 
                {
                    method: 'GET', 
                    headers: {'Content-Type': 'application/json'},
                }
            );
            if (!response.ok) throw 'Something went wrong!';
            const result = await response.json();
            dispatch({
                type: LOAD_ORDERS_ACTION,
                orders: Object.keys(result ?? {}).map((id) => new Order({id, json: result[id]}))
            })
        } catch (e) {
            console.log(e)
            throw e;
        }
    }
}

export const placeOrder = (price, items=[]) => {
    return async (dispatch, getState) => {
        try {
            const date = moment().unix();
            const userId = getState()?.[AUTH_MODULE_NAME]?.userId;
            const token = getState()?.[AUTH_MODULE_NAME]?.token;

            const elems = Object.entries(items ?? {}).map(([k,v]) => v);
            const body = {
                date,
                price: price,
                items: elems,
            };
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`, 
                {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(body),
                }
            );
            if (!response.ok) throw 'Something went wrong!';
            const result = await response.json();
            dispatch({
                type: PLACE_ORDER,
                order: new Order({id: result.name, json: body})
            });
        } catch (e) {
            console.log(e)
            throw e;
        }  
    };
};