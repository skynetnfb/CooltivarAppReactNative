import {E_USER_LOGGED, E_USER_LOGGED_IN, E_USER_LOGGED_OUT} from '../enum/UserEnum';
/*
export function userLogin(user) {
    return {
        type: E_USER_LOGGED,
        payload: {user: user},
    };
}

export function userLogout() {
    return {
        type: E_USER_LOGGED_OUT,
    };
}
*/
export const USER_LOGGED_REQ = (dispatch) => {return (user)=> dispatch ({type: E_USER_LOGGED_IN,user});};
export const USER_LOGGED_OUT_REQ = (dispatch) => {return ()=> dispatch ({type: E_USER_LOGGED_OUT});};
