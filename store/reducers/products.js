import { Product } from '../../model/product';
import * as c from '../constants';

const initialState = {
    products: {
        a: new Product('a', 'test', 25, 'Dummy description', 'https://images.jpost.com/image/upload/f_auto,fl_lossy/t_JD_ArticleMainImageFaceDetect/481343')
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case c.SAVE_PRODUCT_ACTION:
            return {...state, products: {...state.products, [action.id]: action.payload}} 

        case c.REMOVE_PRODUCT_ACTION:
            const newProducts = {...state.products};
            delete newProducts[action.id];
            return {...state, products: newProducts} 
        default:
            return state;
    }
}

export default reducer;
