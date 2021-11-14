import * as c from '../constants';

const initialState = {
    products: {},
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case c.SAVE_PRODUCT_ACTION:
            return {...state, products: {...state.products, [action.id]: action.payload}} 

        case c.REMOVE_PRODUCT_ACTION:
            const newProducts = {...state.products};
            delete newProducts[action.id];
            return {...state, products: newProducts} 

        case c.LOAD_PRODUCTS_ACTION:
            return {...state, products: action.products};

        default:
            return state;
    }
}

export default reducer;
