import {
    E_INSERT_CULTIVATION_REQ, E_INSERT_CULTIVATION_SUCCESS, E_INSERT_CULTIVATION_FAIL,
    E_UPDATE_CULTIVATION_REQ, E_UPDATE_CULTIVATION_SUCCESS, E_UPDATE_CULTIVATION_FAIL,
    E_DELETE_CULTIVATION_REQ, E_DELETE_CULTIVATION_SUCCESS, E_DELETE_CULTIVATION_FAIL,
    E_FIND_CULTIVATION_REQ, E_FIND_CULTIVATION_SUCCESS, E_FIND_CULTIVATION_FAIL,
} from '../enum/cultivation';
import {makeFindAction} from './field';

// per prendere il "trigger": INSERT_CULTIVATION_ACTION(dispatch);
// per eseguirla direttamente: INSERT_CULTIVATION_ACTION(dispatch)();
export const INSERT_CULTIVATION_ACTION_REQ = (dispatch) => { return (field) => dispatch({type: E_INSERT_CULTIVATION_REQ, field: field}); };
export const INSERT_CULTIVATION_ACTION_SUCCESS = (dispatch) => { return (field) => dispatch({type: E_INSERT_CULTIVATION_SUCCESS, field: field}); };
export const INSERT_CULTIVATION_ACTION_FAIL = (dispatch) => { return (field) => dispatch({type: E_INSERT_CULTIVATION_FAIL, field: field}); };


export const UPDATE_CULTIVATION_ACTION_REQ = (dispatch) => { return (field) => dispatch({type: E_UPDATE_CULTIVATION_REQ, field: field}); };
export const UPDATE_CULTIVATION_ACTION_SUCCESS = (dispatch) => { return (field) => dispatch({type: E_UPDATE_CULTIVATION_SUCCESS, field: field}); };
export const UPDATE_CULTIVATION_ACTION_FAIL = (dispatch) => { return (field) => dispatch({type: E_UPDATE_CULTIVATION_FAIL, field: field}); };


export const DELETE_CULTIVATION_ACTION_REQ = (dispatch) => { return (field, id) => dispatch({type: E_DELETE_CULTIVATION_REQ, field: field, id: id}); };
export const DELETE_CULTIVATION_ACTION_SUCCESS = (dispatch) => { return (field, id) => dispatch({type: E_DELETE_CULTIVATION_SUCCESS, field: field, id: id}); };
export const DELETE_CULTIVATION_ACTION_FAIL = (dispatch) => { return (field, id) => dispatch({type: E_DELETE_CULTIVATION_FAIL, field: field, id: id}); };


// no args = findAll
export const FIND_CULTIVATION_ACTION_REQ = (dispatch) => {
    return (field_or_query_or_numberid, key = "cultivation") => dispatch(makeFindAction(E_FIND_CULTIVATION_REQ, field_or_query_or_numberid, key)); };
export const FIND_CULTIVATION_ACTION_SUCCESS = (dispatch) => {
    return (field_or_query_or_numberid, key = "cultivation") => dispatch(makeFindAction(E_FIND_CULTIVATION_SUCCESS, field_or_query_or_numberid, key)); };
export const FIND_CULTIVATION_ACTION_FAIL = (dispatch) => {
    return (field_or_query_or_numberid, key = "cultivation") => dispatch(makeFindAction(E_FIND_CULTIVATION_FAIL, field_or_query_or_numberid, key)); };

/*
template to paste:
export const _CULTIVATION_ACTION_REQ = (dispatch) => { return (field, id) => dispatch({type: E__CULTIVATION_REQ, field: field, id: id}); };
export const _CULTIVATION_ACTION_SUCCESS = (dispatch) => { return (field, id) => dispatch({type: E__CULTIVATION_SUCCESS, field: field, id: id}); };
export const _CULTIVATION_ACTION_FAIL = (dispatch) => { return (field, id) => dispatch({type: E__CULTIVATION_FAIL, field: field, id: id}); };
*/
