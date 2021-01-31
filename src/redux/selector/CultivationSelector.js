export const findAll = (state) => () => {
    return state.cultivations;
};

export const find = (state) => (id) => {
    return query(state)( (e) => (e.id === id) )[0];
};

export const findByField = (state) => (id) => {
    return query(state)( (e) => (e.field_id === id) );
};

export const query = (state) => (queryFunction) => {
    return state.cultivations.filter(queryFunction);
};

export const queryIndex = (state) => (queryFunction) => {
    return state.cultivations.findIndex(queryFunction);
};

export const CultivationSelector = {
    findAll: findAll,
    find: find,
    query: query,
    queryIndex: queryIndex,
    findByField: findByField,
};
