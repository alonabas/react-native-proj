import { AUTHENTICATE, LOGOUT_ACTION } from '../constants';

const initialState = {
    token: null,
    userId: null
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return {token: action.idToken, userId: action.userId}

        case LOGOUT_ACTION:
            return initialState;

        default:
            return state;
    }
}

export default reducer;