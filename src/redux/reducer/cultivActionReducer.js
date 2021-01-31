import {initialState} from '../store/store';
import { FieldEnum } from '../action/enum/FieldEnum';
import {CultivActionDB, CultivationDB, FieldDB} from '../../model/Repository';
import {FieldSelector} from '../selector/FieldSelector';
import {CultivationEnum} from '../action/enum/CultivationEnum';
import {CultivationSelector} from '../selector/CultivationSelector';
import {CultivActionEnum} from '../action/enum/OperationEnum';


const cultivActionReducer = (state = initialState, action) => {
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

        case CultivActionEnum.FIND_REQ:
            // query | id | none of those (findall)
            if (action.id) {
                response = CultivActionDB.find(+action.id);
                if (!response) return;
                index = CultivActionSelector.queryIndex(newState)( (ca) => (ca.id === action.id) );
                if (index >= 0) newState.cultivations[index] = response;
                else newState.cultivActions.push(response);
                break;
                // newState.findResponses[action.key] = response;
            }
            if (action.query) {
                response = CultivActionDB.query(action.query);
                if (!response) break;
                if (!Array.isArray(response)) response = [response];
                for (let item of response) {
                    index = CultivActionSelector.queryIndex(newState)( (c) => (c.id === item.id) );
                    if (index >= 0) newState.cultivActions[index] = item;
                    else newState.fields.push(item);
                }
                break;
            }
            response = CultivActionDB.findAll() || [];
            console.log('----------------------------RESPONSE REDUCER Cultiv_ACTIONS .findAll():',response);
            newState.cultivActions = response;
            break;

        // NB: adesso l'accesso al db è sincrono, se diventa asincrono nella _REQ si dovrebbe fare una cosa tipo:
        // .then( dispatch({ type: E_FIND_FIELD_SUCCESS, ...})).catch( dispatch({ type: E_FIND_FIELD_FAIL, ...});
            break;
        case CultivActionEnum.INSERT_REQ:
            if (!newState.cultivActions) newState.cultivActions = [];
            CultivActionDB.insert(action.cultivation);
            newState.cultivActions.push(action.cultivation);
            break;
        case CultivationEnum.UPDATE_REQ:
            //TODO
            console.log('!!!---------------------TODO---------------------------!!!');
        case CultivationEnum.DELETE_REQ:
            //TODO
            console.log('!!!---------------------TODO---------------------------!!!');
    }
    return newState;
};

export default cultivActionReducer;
