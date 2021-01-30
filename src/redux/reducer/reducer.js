import {initialState} from '../store/store';
import { FieldEnum } from '../action/enum/field';
import {
    createCultivAction,
    createCultivation,
    CultivActionDB,
    CultivationDB,
    deleteCultivAction,
    deleteCultivation,
    FieldDB, updateCultivAction,
    updateCultivation,
} from '../../model/Repository';
import {FieldSelector} from '../selector/field';
import {CultivationEnum} from '../action/enum/cultivation';
import {CultivActionEnum} from '../action/enum/Operation';
import {UserEnum} from '../action/enum/UserEnum';
import {CultivationSelector} from '../selector/cultivation';
import Field from '../../model/Field';
import Cultivation from '../../model/Cultivation';
import CultivAction from '../../model/CultivAction';
import {METEO_TODAY_REQUEST} from '../action/dispatchers/meteoAction';
import {E_OPENWEATHER_GET_FORECAST, E_OPENWEATHER_GET_TODAY, METEO_ENUM} from '../action/enum/MeteoActionEnum';
import {CultivActionSelector} from '../selector/cultivAction';

function debugStatusSize(state) {
    let ret = {};
    ret = state;
    /*
    if (!state) return {'??' : 'not an object?'};
    for (let key in state) {
        const val = state[key];
        let previewVal;
        switch( typeof(val) ){
            case 'object':
                previewVal = Array.isArray(val) ? val.length : val;
                break;
        }
        ret[key] = typeof(val) === 'object' ? (Array.isArray(val) ? val.length : typeof 'object') : val;
    }*/
    return ret;
}

const reducer = (state = initialState, action) => {
    if (!action) return state;
    const newState: AppState = JSON.parse(JSON.stringify(state)); // lo stato deve essere immutabile, quindi lo clono.
    if (action.type && action.type.indexOf("@@redux/INIT") === 0) {
        // redux passa stringhe tipo "@@redux/INITx.n.j.n.w.l" per inizializzare (con codici random?)
        action.type0 = action.type;
        action.type = "@@redux/INIT";
    }

    let field: Field = null;
    let cultivation: Cultivation = null;
    let cultivAction: CultivAction = null;
    let id: string;
    console.log("REDUCER EXECUTING ACTION: " + (action.type), action, " Status : ", debugStatusSize(state));
    let response, index;
    switch (action.type) {
        default:
            console.error("invalid reducer action:", action.type, action);
            break;
        case "@@redux/INIT": return state;
        // field
        case FieldEnum.FIND_REQ:
            console.log('!!!---------------------------------------------FieldEnum.FIND_REQ');
            // query | id | none of those (findall)
            if (action.id) {
                response = FieldDB.find(+action.id);
                if (!response) break;
                index = FieldSelector.queryIndex(newState)( (f) => (f.id === action.id) );
                if (index >= 0) newState.fields[index] = response;
                else newState.fields.push(response);
                // newState.findResponses[action.key] = response;
                // per recuperarlo usa un selector
            } else
            if (action.query) {
                response = FieldDB.query(action.query);
                if (!response) break;
                if (!Array.isArray(response)) response = [response];
                for (let item of response) {
                    index = FieldSelector.queryIndex(newState)( (f) => (f.id === item.id) );
                    if (index >= 0) newState.fields[index] = item;
                    else newState.fields.push(item);
                }
            } else {
                response = FieldDB.findAll() || [];
                newState.fields = response;
            }
            newState.fields = JSON.parse(JSON.stringify(newState.fields));
            break;
        case FieldEnum.INSERT_REQ:
            console.log('!!!---------------------------------------------FIELD ACTION.INSERT_REQ', action);
            field = action.field;
            if (Array.isArray(field.coordinate)) {
                field.coordinate = JSON.stringify(field.coordinate);
            }
            // field.image = null;
            FieldDB.insert(field);
            newState.fields.push(field);
            console.log('!!!---------------------------------------------FIELD ACTION.INSERT_REQ  size: ', state.fields.length, ' ---> ', newState.fields.length);
            break;
        case FieldEnum.UPDATE_REQ:
            field = action.field;
            id = field.id;
            index = FieldSelector.queryIndex(newState)((f) => f.id === id);
            FieldDB.update(field);
            newState.fields[index] = field;
            break;
        case FieldEnum.DELETE_REQ:
            id = action.id || action.field.id;
            let cultivations = CultivationSelector.findByField(newState)(action.field.id);
            if (cultivations.length) { console.warn("cannot delete a field used in cultivations"); }
            index = FieldSelector.queryIndex(newState)((f) => f.id === id);
            FieldDB.delete(field);
            field = newState.fields.splice(index,1);
            break;
        // cultivation
        case CultivationEnum.FIND_REQ:
            //console.log('!!!---------------------------------------------CultivationEnum.FIND_REQ');
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
                //console.log('!!!---------------------------------------------CultivationEnum.FIND_REQ if(action.query)');
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
            //console.log('----------------------------RESPONSE REDUCER CultivationDB.findAll():',response);
            newState.cultivations = response;
            break;
        case CultivationEnum.UPDATE_REQ:
            let _cultivation = action.cultivation;
            //console.log('!!!---------------------REDUCER CULTIVATION UPDATE---------------------------!!! CULTIVATION',_cultivation);
            updateCultivation(_cultivation);
            index = newState.cultivations.findIndex((e)=> (e.id === _cultivation.id));
            //console.log('!!!---------------------REDUCER CULTIVATION UPDATE---------------------------!!! POSITION', index,"CULTIVATION",_cultivation, "STATE cultivation:",  newState.cultivations[index]);
            // todo: manca la call al db, uniscile.
            console.log('!!!---------------------UPDATE---------------------------!!! POSITION', position,"CULTIVATION",_cultivation, "STATE cultivation:",  newState.cultivations[position]);
            newState.cultivations[index] = _cultivation;
            break;
        case CultivationEnum.INSERT_REQ:
            _cultivation = action.cultivation;
            createCultivation(_cultivation);
            console.log("!!!--------------------- REDUCER INSERT---------------------------!!!CULTIVATION",_cultivation, );
            newState.cultivations.push(_cultivation);
            break;
        case CultivationEnum.DELETE_REQ:
            id = action.id;
            deleteCultivation(action.cultivation);
            index = newState.cultivations.findIndex((e)=> (e.id === action.cultivation));
            newState.cultivations.splice(index,1);
            break;
        case CultivActionEnum.FIND_REQ:
            // query | id | none of those (findall)
            if (action.id) {
                response = CultivActionDB.find(+action.id);
                if (!response) return;
                index = CultivActionSelector.queryIndex(newState)( (ca) => (ca.id === action.id) );
                if (index >= 0) newState.cultivActions[index] = response;
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
                    else newState.cultivActions.push(item);
                }
                break;
            }
            response = CultivActionDB.findAll() || [];
            console.log('----------------------------RESPONSE REDUCER Cultiv_ACTIONS .findAll():',response);
            newState.cultivActions = response;
            break;
        case CultivActionEnum.FIND_BY_CULTIVATION_REQ:
            if (action.query) {
                response = CultivActionDB.findAllByCultivation(+action.query)||[];
                //TODO forse è meglio sostituire le action della coltivazione corrente
                newState.cultivActions=response;
                break;
            }
            break;
        case CultivActionEnum.INSERT_REQ:
            let _cultiv_Action = action.cultivAction;
            createCultivAction(_cultiv_Action);
            //console.log("!!!--------------------- REDUCER INSERT CULTIV_ACTION---------------------------!!!CULTIVATION",_cultiv_Action, );
            newState.cultivActions.push(_cultiv_Action);
            break;
        case CultivActionEnum.UPDATE_REQ:
            _cultiv_Action = action.cultivAction;
            //console.log('!!!---------------------REDUCER CULTIV_ACTION UPDATE---------------------------!!! CULTIVATION',_cultiv_Action);
            updateCultivAction(_cultiv_Action);
            index = newState.cultivations.findIndex((e)=> (e.id === _cultiv_Action.id));
            newState.cultivActions[index] = _cultiv_Action;
            //console.log('!!!---------------------REDUCER CULTIV_ACTION UPDATE FINISH---------------------------!!! ');
            break;
        case FieldEnum.FIND_SUCCESS:
        case FieldEnum.FIND_FAIL:
        // NB: adesso l'accesso al db è sincrono, se diventa asincrono nella _REQ si dovrebbe fare una cosa tipo:
        // .then( dispatch({ type: E_FIND_FIELD_SUCCESS, ...})).catch( dispatch({ type: E_FIND_FIELD_FAIL, ...});

        case E_OPENWEATHER_GET_FORECAST: // id: fieldid, icons: meteoicon[]
            index = FieldSelector.queryIndex(newState)((f) => f.id === action.id);
            field = newState.fields[index];
            field.forecast = action.icons;
            field.forecastTime = new Date().getTime();
            console.log("reducer set forecast:", index, field);
            break;
        case E_OPENWEATHER_GET_TODAY: // id: fieldid, icon: meteoicon
            index = FieldSelector.queryIndex(newState)((f) => f.id === action.id);
            field = newState.fields[index];
            field.weather = action.icon;
            field.weatherTime = new Date().getTime();
            console.log("reducer set weather:", index, field);
            break;
        case UserEnum.USER_LOGGED:
            console.log('###!!!---------------------------------------------REDUCER UserEnum.USER_LOGGED');
            newState.logged = true;
            newState.user = action.user;
            break;
        case UserEnum.USER_LOGGED_OUT:
            console.log('###!!!---------------------------------------------REDUCER UserEnum.USER_LOGGED_OUT');
            newState.logged = false;
            newState.user = null;
            break;

    }
    console.log("REDUCER RETURNING Status : ", debugStatusSize(newState));
    return newState;
};

export default reducer;
