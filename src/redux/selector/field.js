// private
function fixCoordinates(field) {
    if (!Array.isArray(field.coordinate)) field.coordinate = JSON.parse( field.coordinate );
}

function getFieldsCopy(state) {
    return state.fields ? JSON.parse(JSON.stringify(state.fields)) : [];
}

// public
export const findAll = (state) => () => {
    const ret = getFieldsCopy(state);
    for (let field of ret) { fixCoordinates(field); }
    return ret;
};

export const find = (state) => (id) => {
    console.log('field selector find1 called:');
    return query(state)( (e) => (e.id === id) )[0];
};

export const query = (state) => (queryFunction) => {
    let ret = getFieldsCopy(state.fields);
    for (let field of ret) { fixCoordinates(field); }
    ret = ret.find(queryFunction)
    console.log('field selector query return:', ret);
    return ret;
};

export const queryIndex = (state) => (queryFunction) => {
    return state.fields.findIndex(queryFunction);
};

export const FieldSelector = {
    findAll: findAll,
    find: find,
    query: query,
    queryIndex: queryIndex,
};
