import * as c from '../constants';

const initialState = {
    orders: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case c.PLACE_ORDER:
            return {...state, orders: [...state.orders, action.order]}
        
        case c.LOAD_ORDERS_ACTION:
            return {orders: action.orders};
            
        default:
            return state;
    }
}

export default reducer;
