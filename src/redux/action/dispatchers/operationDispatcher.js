import {
    E_INSERT_OPERATION_REQ, E_INSERT_OPERATION_SUCCESS, E_INSERT_OPERATION_FAIL,
    E_UPDATE_OPERATION_REQ, E_UPDATE_OPERATION_SUCCESS, E_UPDATE_OPERATION_FAIL,
    E_DELETE_OPERATION_REQ, E_DELETE_OPERATION_SUCCESS, E_DELETE_OPERATION_FAIL,
    E_FIND_OPERATION_REQ, E_FIND_OPERATION_SUCCESS, E_FIND_OPERATION_FAIL,
} from '../enum/Operation';
import {makeFindAction} from './field';

// per prendere il "trigger": INSERT_OPERATION_ACTION(dispatch);
// per eseguirla direttamente: INSERT_OPERATION_ACTION(dispatch)();
export const INSERT_OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction) => dispatch({type: E_INSERT_OPERATION_REQ, cultivAction: cultivAction}); };
export const INSERT_OPERATION_ACTION_SUCCESS = (dispatch) => { return (cultivAction) => dispatch({type: E_INSERT_OPERATION_SUCCESS, cultivAction: cultivAction}); };
export const INSERT_OPERATION_ACTION_FAIL = (dispatch) => { return (cultivAction) => dispatch({type: E_INSERT_OPERATION_FAIL, cultivAction: cultivAction}); };


export const UPDATE_OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction) => dispatch({type: E_UPDATE_OPERATION_REQ, cultivAction: cultivAction}); };
export const UPDATE_OPERATION_ACTION_SUCCESS = (dispatch) => { return (cultivAction) => dispatch({type: E_UPDATE_OPERATION_SUCCESS, cultivAction: cultivAction}); };
export const UPDATE_OPERATION_ACTION_FAIL = (dispatch) => { return (cultivAction) => dispatch({type: E_UPDATE_OPERATION_FAIL, cultivAction: cultivAction}); };


export const DELETE_OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction, id) => dispatch({type: E_DELETE_OPERATION_REQ, cultivAction: cultivAction, id: id}); };
export const DELETE_OPERATION_ACTION_SUCCESS = (dispatch) => { return (cultivAction, id) => dispatch({type: E_DELETE_OPERATION_SUCCESS, cultivAction: cultivAction, id: id}); };
export const DELETE_OPERATION_ACTION_FAIL = (dispatch) => { return (cultivAction, id) => dispatch({type: E_DELETE_OPERATION_FAIL, cultivAction: cultivAction, id: id}); };


// no args = findAll
export const FIND_OPERATION_ACTION_REQ = (dispatch) => {
    return (field_or_query_or_numberid, key='cultivAction') => dispatch(makeFindAction(E_FIND_OPERATION_REQ, field_or_query_or_numberid, key)); };
export const FIND_OPERATION_ACTION_SUCCESS = (dispatch) => {
    return (field_or_query_or_numberid, key='cultivAction') => dispatch(makeFindAction(E_FIND_OPERATION_SUCCESS, field_or_query_or_numberid, key)); };
export const FIND_OPERATION_ACTION_FAIL = (dispatch) => {
    return (field_or_query_or_numberid, key='cultivAction') => dispatch(makeFindAction(E_FIND_OPERATION_FAIL, field_or_query_or_numberid, key)); };

/*
template to paste:
export const _OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction, id) => dispatch({type: E__OPERATION_REQ, cultivAction: cultivAction, id: id}); };
export const _OPERATION_ACTION_SUCCESS = (dispatch) => { return (cultivAction, id) => dispatch({type: E__OPERATION_SUCCESS, cultivAction: cultivAction, id: id}); };
export const _OPERATION_ACTION_FAIL = (dispatch) => { return (cultivAction, id) => dispatch({type: E__OPERATION_FAIL, cultivAction: cultivAction, id: id}); };
*/
