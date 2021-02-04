import {E_USER_LOGGED_IN, E_USER_LOGGED_OUT} from '../action_enum';

export const USER_LOGGED_REQ = (dispatch) => {return (user)=> dispatch ({type: E_USER_LOGGED_IN,user});};
export const USER_LOGGED_OUT_REQ = (dispatch) => {return ()=> dispatch ({type: E_USER_LOGGED_OUT});};
