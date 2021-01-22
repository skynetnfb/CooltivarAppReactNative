export const findAll = (state) => () => {
    return state.fields;
};

export const find = (state) => (id) => {
    return query(state)( (e) => (e.id === id) );
};

export const query = (state) => (queryFunction) => {
    return state.fields.find(queryFunction);
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
