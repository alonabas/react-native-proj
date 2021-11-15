import moment from 'moment';
import { Order } from "../../model/order";
import { LOAD_ORDERS_ACTION, PLACE_ORDER } from '../constants';

export const loadOrders = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/orders.json`, 
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
    return async dispatch => {
        try {
            const date = moment().unix();
            // console.log(items)
            const elems = Object.entries(items ?? {}).map(([k,v]) => v);
            const body = {
                date,
                price: price,
                items: elems,
            };
            console.log(body)
            const response = await fetch(
                `https://react-native-proj-shop-app-default-rtdb.firebaseio.com/orders.json`, 
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