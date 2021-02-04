import {
    E_INSERT_OPERATION_REQ, // E_INSERT_OPERATION_SUCCESS, E_INSERT_OPERATION_FAIL,
    E_UPDATE_OPERATION_REQ, // E_UPDATE_OPERATION_SUCCESS, E_UPDATE_OPERATION_FAIL,
    E_DELETE_OPERATION_REQ, // E_DELETE_OPERATION_SUCCESS, E_DELETE_OPERATION_FAIL,
    E_FIND_OPERATION_REQ, // E_FIND_OPERATION_SUCCESS, E_FIND_OPERATION_FAIL,
    E_FIND_OPERATION_BY_CULTIVATION_REQ,
} from '../action_enum';
import {makeFindAction} from './FieldAction';

// per prendere il "trigger": INSERT_OPERATION_ACTION(dispatch);
// per eseguirla direttamente: INSERT_OPERATION_ACTION(dispatch)();
export const INSERT_OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction) => dispatch({type: E_INSERT_OPERATION_REQ, cultivAction: cultivAction}); };

export const UPDATE_OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction) => dispatch({type: E_UPDATE_OPERATION_REQ, cultivAction: cultivAction}); };

export const DELETE_OPERATION_ACTION_REQ = (dispatch) => { return (cultivAction, id) => dispatch({type: E_DELETE_OPERATION_REQ, cultivAction: cultivAction, id: id}); };

// no args = findAll
export const FIND_OPERATION_ACTION_REQ = (dispatch) => {
    return (field_or_query_or_numberid, key='cultivAction') => dispatch(makeFindAction(E_FIND_OPERATION_REQ, field_or_query_or_numberid, key)); };
export const FIND_OPERATION_BY_CULTIVATION_ACTION_REQ = (dispatch) => {
    return (field_or_query_or_numberid, key='cultivAction') => dispatch(makeFindAction(E_FIND_OPERATION_BY_CULTIVATION_REQ, field_or_query_or_numberid, key)); };
