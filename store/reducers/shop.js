import * as c from '../constants';
import moment from 'moment';

const initialState = {
    cart: {},
    orders: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case c.ADD_ORDER_ITEM: 
            return {...state, cart: {
                ...state.cart, 
                [action.productId]: action.count + (state.cart[action.productId] ?? 0)}}
        
        case c.REMOVE_ITEM_FROM_CART:
            const cartItems = {...state.cart}
            delete cartItems[action.id];
            return {...state, cart: cartItems};
            
        case c.PLACE_ORDER:
            const order = {items: Object.entries(state.cart).map(([id, count]) => ({id, count})), date: moment().unix(), price: action.price}
            return {...state, cart: {}, orders: [...state.orders, order]}
        
        default:
            return state;
    }
}

export default reducer;
