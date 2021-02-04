// privateì
import {AppState} from "../reducer"

let a: AppState;
// private
function fixCoordinates(field: AppState) {
    if (!Array.isArray(field.coordinate)) field.coordinate = JSON.parse( field.coordinate );
}
// private
function getFieldsCopy(state: AppState) {
    return state.fields ? JSON.parse(JSON.stringify(state.fields)) : [];
}

// public
export const findAll = (state: AppState) => () => {
    const ret = getFieldsCopy(state);
    for (let field of ret) { fixCoordinates(field); }
    return ret;
};

export const find = (state: AppState) => (id: string) => {
    console.log('field selector find1 called on' + state.fields.length + " fields...");
    const ret = query(state)( (e) => {
        console.log('field selector check (' + e.name + "), ", e.id, ' =?= ',id, ' ---> ', e.id === id);
        return e.id === id;
    } )[0];
    console.log('field selector find1 returns:' + ret);
    return ret;
};

export const query = (state: AppState) => (queryFunction) => {
    let ret = getFieldsCopy(state);
    console.log('field selector query searching on ' + ret.length + " fields...");
    for (let field of ret) { fixCoordinates(field); }
    ret = ret.filter(queryFunction)
    console.log('field selector query return:', ret);
    return ret;
};

export const queryIndex = (state: AppState) => (queryFunction: ()=>boolean) => {
    return state.fields.findIndex(queryFunction);
};

export const FieldSelector = {
    findAll: findAll,
    find: find,
    query: query,
    queryIndex: queryIndex,
};
