import {initialState} from '../store/store';
import { FieldEnum } from '../action/enum/field';

import {CultivActionDB, CultivationDB, FieldDB} from '../../model/Repository';
import {FieldSelector} from '../selector/field';


const reducer = (state = initialState, action) => {
    if (!action) return state;
    const newState = JSON.parse(JSON.stringify(state)); // lo stato deve essere immutabile, quindi lo clono.
    if (action.type && action.type.indexOf("@@redux/INIT") === 0) {
        // redux passa stringhe tipo "@@redux/INITx.n.j.n.w.l" per inizializzare (con codici random?)
        action.type0 = action.type;
        action.type = "@@redux/INIT";
    }

    console.log("REDUCER EXECUTING ACTION: " + (action.type), action);
    let response, index;
    switch (action.type) {
        default:
            console.error("invalid reducer action:", action.type, action);
            break;
        case "@@redux/INIT": return state;
        case FieldEnum.FIND_REQ:
            // query | id | none of those (findall)
            if (action.id) {
                response = FieldDB.find(+action.id);
                if (!response) return;
                index = FieldSelector.queryIndex(newState)( (f) => (f.id === action.id) );
                if (index >= 0) newState.fields[index] = response;
                else newState.fields.push(response);
                break;
                // newState.findResponses[action.key] = response;
                // per recuperarlo usa un selector
            }
            if (action.query) {
                response = FieldDB.query(action.query);
                if (!response) break;
                if (!Array.isArray(response)) response = [response];
                for (let item of response) {
                    index = FieldSelector.queryIndex(newState)( (f) => (f.id === item.id) );
                    if (index >= 0) newState.fields[index] = item;
                    else newState.fields.push(item);
                }
                break;
            }
            response = FieldDB.findAll() || [];
            newState.fields = response;
            break;
        case FieldEnum.FIND_SUCCESS:
        case FieldEnum.FIND_FAIL:
        // NB: adesso l'accesso al db è sincrono, se diventa asincrono nella _REQ si dovrebbe fare una cosa tipo:
        // .then( dispatch({ type: E_FIND_FIELD_SUCCESS, ...})).catch( dispatch({ type: E_FIND_FIELD_FAIL, ...});
            break;
        case FieldEnum.INSERT_REQ:
            if (!newState.fields) newState.fields = [];
            FieldDB.insert(action.field);
            newState.fields.push(action.field);
            break;
    }
    return newState;
};

export default reducer;
