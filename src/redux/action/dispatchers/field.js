import {E_INSERT_FIELD, E_DELETE_FIELD, E_UPDATE_FIELD} from '../enum/field';

export const INSERT_FIELD = (field) => dispatch({type: E_INSERT_FIELD, field: field});
export const UPDATE_FIELD = (field) => dispatch({type: E_UPDATE_FIELD, field: field});
export const DELETE_FIELD = (field, id) => dispatch({type: E_DELETE_FIELD, field: field, id: id});

// ritorna una funzione che emette l'action solo quando eseguita con i parametri richiesti.
// per prendere il "trigger": INSERT_FIELD_ACTION(dispatch);
// per eseguirla direttamente: INSERT_FIELD_ACTION(dispatch)();
export const INSERT_FIELD_ACTION = (dispatch) => { return (field) => dispatch({type: E_INSERT_FIELD, field: field}); };
export const UPDATE_FIELD_ACTION = (dispatch) => { return (field) => dispatch({type: E_UPDATE_FIELD, field: field}); };
export const DELETE_FIELD_ACTION = (dispatch) => { return (field, id) => dispatch({type: E_DELETE_FIELD, field: field, id: id}); };


// (field) => dispatch({type: "INSERT_FIELD", field: field})
