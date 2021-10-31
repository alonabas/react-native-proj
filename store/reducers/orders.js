import * as c from '../constants';
import moment from 'moment';
import { Order } from '../../model/order';

const initialState = {
    orders: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case c.PLACE_ORDER:
            const date = moment().unix()
            const items = Object.entries(action.items ?? {}).map(([k,v]) => v);
            const order = new Order(date, date, action.price, items);
            return {...state, orders: [...state.orders, order]}
        
        default:
            return state;
    }
}

export default reducer;
