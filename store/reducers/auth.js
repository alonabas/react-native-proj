import { AUTHENTICATE, LOGOUT_ACTION, SET_INIT_FALSE } from '../constants';

const initialState = {
    token: null,
    userId: null,
    isInit: true,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SET_INIT_FALSE: 
            return {...state, isInit: false}
        case AUTHENTICATE:
            return {token: action.idToken, userId: action.userId, isInit: false}

        case LOGOUT_ACTION:
            return {...initialState, isInit: false};

        default:
            return state;
    }
}

export default reducer;