import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    console.log('Authenticating...');
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = isSignup ? 
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDZTbN_UP1vYLgrc0mpnDtjabDeENF7NQM' 
            : 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDZTbN_UP1vYLgrc0mpnDtjabDeENF7NQM' ;

        axios.post(url, data)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(error => {
                console.error(error);
                dispatch(authFailed(error));
            })
    };
};