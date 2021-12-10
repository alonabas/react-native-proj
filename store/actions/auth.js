const API_KEY;
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { AUTHENTICATE, LOGOUT_ACTION } from '../constants';

export const authenticate = (idToken, localId, expiration) => {
    return async dispatch => {
        try {
            await AsyncStorage.setItem('userData', JSON.stringify({
                idToken, localId, expiration
            }));
            dispatch({type: AUTHENTICATE, idToken, userId: localId })
        } catch (e) {
            console.log(e)
        }
        
    }
}

export const logout = () => {
    return async dispatch => {
        await AsyncStorage.removeItem('userData');
        dispatch({type: LOGOUT_ACTION});
    }
}

export const singUp = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, 
                {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true
                    }),
                }
            );
            let result;
            if (!response.ok) {
                let error ='Something went wrong...';
                result = await response.json();
                if (result?.error?.message === 'EMAIL_EXISTS') error = 'The email address is already in use by another account.';
                else if(result?.error?.message === 'TOO_MANY_ATTEMPTS_TRY_LATER') error = 'We have blocked all requests from this device due to unusual activity. Try again later.'
                else if(result?.error?.message === 'OPERATION_NOT_ALLOWED') error = 'Password sign-in is disabled for this project.'
                else if(result?.error?.message.startsWith('WEAK_PASSWORD')) error = result?.error?.message.replace('WEAK_PASSWORD : ', '')
                throw new Error(error);
            }
            result = await response.json();
            const expiration = moment().add(+result.expiresIn, 'seconds');
            dispatch(authenticate(result.idToken, result.localId, expiration));
            // dispatch({type: SIGN_UP_ACTION, idToken: result.idToken, userId: result.localId })
        } catch (e) {
            console.log(e)
            throw e;
        }  
    };
};

export const singIn = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, 
                {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true
                    }),
                }
            );
            let result;
            if (!response.ok) {
                let error ='Something went wrong...';
                result = await response.json();
                if (result?.error?.message === 'EMAIL_NOT_FOUND') error = 'User with this email address does not exist.';
                else if(result?.error?.message === 'INVALID_PASSWORD') error = 'Username or password is invalid.'
                else if(result?.error?.message === 'USER_DISABLED') error = 'Account has been disabled.'
                throw new Error(error);
            }
            result = await response.json();
            const expiration = moment().add(+result.expiresIn, 'seconds');
            dispatch(authenticate(result.idToken, result.localId, expiration));

            // dispatch({type: LOGIN_ACTION, idToken: result.idToken, userId: result.localId })
        } catch (e) {
            console.log(e)
            throw e;
        }  
    };
};
