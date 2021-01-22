export const findAll = (state) => () => {
    return state.cultivation;
};

export const find = (state) => (id) => {
    return query(state)( (e) => (e.id === id) );
};

export const query = (state) => (queryFunction) => {
    return state.cultivation.find(queryFunction);
};

export const queryIndex = (state) => (queryFunction) => {
    return state.cultivation.findIndex(queryFunction);
};

export const CultivationSelector = {
    findAll: findAll,
    find: find,
    query: query,
    queryIndex: queryIndex,
};
