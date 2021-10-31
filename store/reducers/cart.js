import * as c from '../constants';
import moment from 'moment';
import { OrderItem } from '../../model/order';

const initialState = {
    cart: {},
    totalPrice: 0,
    orders: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case c.ADD_ORDER_ITEM: 
            const orderItem = state.cart[action.productId];
            const count = action.count + (orderItem?.count ?? 0);
            let newTotalPrice = state.totalPrice - (orderItem?.count ?? 0)*(orderItem?.price  ?? 0) +action.price * count;
            const newOrderItem = new OrderItem(
                action.productId, 
                count, 
                action.productTitle, 
                action.price * count)
            return {...state, 
                cart: {
                    ...state.cart, 
                    [action.productId]: newOrderItem
                },
                totalPrice: newTotalPrice
            }
        
        case c.REMOVE_ITEM_FROM_CART:
            const cartItems = {...state.cart};
            newTotalPrice = state.totalPrice - cartItems[action.id].price;
            delete cartItems[action.id];
            return {...state, cart: cartItems, totalPrice: newTotalPrice};
            
        case c.PLACE_ORDER:
            const order = {items: Object.entries(state.cart).map(([id, data]) => ({id, ...data})), date: moment().unix(), price: action.price}
            return {...state, cart: {}, orders: [...state.orders, order]}
        
        default:
            return state;
    }
}

export default reducer;
