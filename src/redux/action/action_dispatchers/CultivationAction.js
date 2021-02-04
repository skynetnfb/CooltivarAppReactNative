import {
    E_INSERT_CULTIVATION_REQ, // E_INSERT_CULTIVATION_SUCCESS, E_INSERT_CULTIVATION_FAIL,
    E_UPDATE_CULTIVATION_REQ, // E_UPDATE_CULTIVATION_SUCCESS, E_UPDATE_CULTIVATION_FAIL,
    E_DELETE_CULTIVATION_REQ, // E_DELETE_CULTIVATION_SUCCESS, E_DELETE_CULTIVATION_FAIL,
    E_FIND_CULTIVATION_REQ, // E_FIND_CULTIVATION_SUCCESS, E_FIND_CULTIVATION_FAIL,
} from '../action_enum';
import {makeFindAction} from './FieldAction';

// per prendere il "trigger": INSERT_CULTIVATION_ACTION(dispatch);
// per eseguirla direttamente: INSERT_CULTIVATION_ACTION(dispatch)();
export const INSERT_CULTIVATION_ACTION_REQ = (dispatch) => { return (cultivation) => dispatch({type: E_INSERT_CULTIVATION_REQ, cultivation: cultivation}); };

export const UPDATE_CULTIVATION_ACTION_REQ = (dispatch) => { return (cultivation) => dispatch({type: E_UPDATE_CULTIVATION_REQ, cultivation: cultivation}); };

export const DELETE_CULTIVATION_ACTION_REQ = (dispatch) => { return (cultivation, id) => dispatch({type: E_DELETE_CULTIVATION_REQ, cultivation: cultivation, id: id}); };

// no args = findAll
export const FIND_CULTIVATION_ACTION_REQ = (dispatch) => {
    return (field_or_query_or_numberid, key = "cultivation") => dispatch(makeFindAction(E_FIND_CULTIVATION_REQ, field_or_query_or_numberid, key)); };
