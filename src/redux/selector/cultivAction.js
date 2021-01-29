export const findAll = (state) => () => {
    return state.cultivActions;
};

export const find = (state) => (id) => {
    return query(state)( (e) => (e.id === id) )[0];
};

export const query = (state) => (queryFunction) => {
    return state.cultivActions.filter(queryFunction);
};

export const queryIndex = (state) => (queryFunction) => {
    return state.cultivActions.findIndex(queryFunction);
};

export const CultivActionSelector = {
    findAll: findAll,
    find: find,
    query: query,
    queryIndex: queryIndex,
};
