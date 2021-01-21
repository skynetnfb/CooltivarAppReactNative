import {initialState} from '../store/store';
import {E_INSERT_FIELD, E_DELETE_FIELD, E_UPDATE_FIELD} from '../action/enum/field';

const reducer = (state = initialState, action) => {
    if (!action) return state;
    const newState = JSON.parse(JSON.stringify(state)); // lo stato deve essere immutabile, quindi lo clono.
    if (action.type && action.type.indexOf("@@redux/INIT") === 0) {
        // redux passa stringhe tipo "@@redux/INITx.n.j.n.w.l" per inizializzare (con codici random?)
        action.type0 = action.type;
        action.type = "@@redux/INIT";
    }

    console.log("REDUCER EXECUTING ACTION: " + (action.type), action);
    switch (action.type) {
        default:
            console.error("invalid reducer action:", action.type, action);
            break;
        case "@@redux/INIT": return state;
        case E_INSERT_FIELD:
            if (!newState.fields) newState.fields = [];
            newState.fields.push(action.field);
            break;
        case E_INSERT_FIELD:
            if (!newState.fields) newState.fields = [];
            newState.fields.push(action.field);
            break;
    }
    return newState;
};

export default reducer;
