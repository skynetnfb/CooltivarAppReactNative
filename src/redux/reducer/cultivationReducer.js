import {AppState, initialState} from '../store/store';
import { FieldEnum } from '../action/enum/field';
import {CultivActionDB, CultivationDB, FieldDB} from '../../model/Repository';
import {FieldSelector} from '../selector/field';
import {CultivationEnum} from '../action/enum/cultivation';
import {CultivationSelector} from '../selector/cultivation';


const cultivationReducer = (state: AppState = initialState, action): AppState => {
    if (!action) return state;
    const newState: AppState = JSON.parse(JSON.stringify(state)); // lo stato deve essere immutabile, quindi lo clono.
    if (action.type && action.type.indexOf("@@redux/INIT") === 0) {
        // redux passa stringhe tipo "@@redux/INITx.n.j.n.w.l" per inizializzare (con codici random?)
        action.type0 = action.type;
        action.type = "@@redux/INIT";
    }

    console.log("REDUCER CULTIVATIONREDUCER EXECUTING ACTION: " + (action.type), action);
    let response, index;
    switch (action.type) {
        default:
            console.error("invalid reducer action:", action.type, action);
            break;
        case "@@redux/INIT": return state;
        case CultivationEnum.FIND_REQ:
            console.log('!!!--------------------------------------------- CULTIVATIONREDUCER CultivActionEnum.FIND_REQ');
            // query | id | none of those (findall)
            if (action.id) {
                response = CultivationDB.find(+action.id);
                if (!response) return;
                index = CultivationSelector.queryIndex(newState)( (c) => (c.id === action.id) );
                if (index >= 0) newState.cultivations[index] = response;
                else newState.cultivations.push(response);
                break;
                // newState.findResponses[action.key] = response;
            }
            if (action.query) {
                response = CultivationDB.query(action.query);
                if (!response) break;
                if (!Array.isArray(response)) response = [response];
                for (let item of response) {
                    index = CultivationSelector.queryIndex(newState)( (c) => (c.id === item.id) );
                    if (index >= 0) newState.cultivations[index] = item;
                    else newState.fields.push(item);
                }
                break;
            }
            response = CultivationDB.findAll() || [];
            console.log('----------------------------RESPONSE REDUCER CultivationDB.findAll():',response);
            //newState.cultivations = response;
            break;
        case CultivationEnum.UPDATE_REQ:
            //TODO
            console.log('!!!---------------------TODO---------------------------!!!');
        case CultivationEnum.DELETE_REQ:
            //TODO
            console.log('!!!---------------------TODO---------------------------!!!');
        // NB: adesso l'accesso al db è sincrono, se diventa asincrono nella _REQ si dovrebbe fare una cosa tipo:
        // .then( dispatch({ type: E_FIND_FIELD_SUCCESS, ...})).catch( dispatch({ type: E_FIND_FIELD_FAIL, ...});
            break;
    }
    return newState;
};

export default cultivationReducer;
