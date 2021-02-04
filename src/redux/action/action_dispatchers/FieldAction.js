import {
    E_INSERT_FIELD_REQ, // E_INSERT_FIELD_SUCCESS, E_INSERT_FIELD_FAIL,
    E_UPDATE_FIELD_REQ, // E_UPDATE_FIELD_SUCCESS, E_UPDATE_FIELD_FAIL,
    E_DELETE_FIELD_REQ, // E_DELETE_FIELD_SUCCESS, E_DELETE_FIELD_FAIL,
    E_FIND_FIELD_REQ, // E_FIND_FIELD_SUCCESS, E_FIND_FIELD_FAIL,
} from '../action_enum';

export const makeFindAction = (eaction, param, key, sourceDebug) => {
    return {
        type: eaction,
        id: typeof param === 'number' ? param : (param === 'object' ? param.id : null),
        query: typeof param === 'string' ? param : null,
        key: key,
        sourceDebug: sourceDebug,
    }
}

// no args = findAll

export const THUNKED_FIND_FIELD = () =>
    (dispatch, getState, third) => {
        console.log('THUNKED getState', getState(), 'third', third);
        dispatch(  makeFindAction(E_FIND_FIELD_REQ, null, 'field', 'By Thunk') );
    };

// per prendere il "trigger": INSERT_FIELD_ACTION(dispatch);
// per eseguirla direttamente: INSERT_FIELD_ACTION(dispatch)();
export const INSERT_FIELD_ACTION_REQ = (dispatch) => { return (field) => dispatch({type: E_INSERT_FIELD_REQ, field: field}); };

export const UPDATE_FIELD_ACTION_REQ = (dispatch) => { return (field) => dispatch({type: E_UPDATE_FIELD_REQ, field: field}); };

export const DELETE_FIELD_ACTION_REQ = (dispatch) => { return (id) => dispatch({type: E_DELETE_FIELD_REQ, id: id}); };

export const FIND_FIELD_ACTION_REQ = (dispatch) => {
    return (field_or_query_or_numberid, key='field') => dispatch(makeFindAction(E_FIND_FIELD_REQ, field_or_query_or_numberid, key)); };
