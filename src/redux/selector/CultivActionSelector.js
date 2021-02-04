export const findAll = (state) => () => {
    return state.cultivActions;
};

export const findAllByCultivation = (state) => (cultivation_id) => {
    return query(state)( (e) => (e.cultivation_id === cultivation_id) );
};
export const findAllByCultivationAndType = (state) => (cultivation_id,type) => {
    return query(state)( (e) => (e.type === type && e.cultivation_id === cultivation_id) );
};

/*
export const findThreatRemedyByCultivation = (state) => (cultivation_id,threat,remedy) => {
    return query(state)( (e) => (e.type === threat||e.type === remedy && e.cultivation_id === cultivation_id) );
};
*/
/*
export const findAllByCultivation = (state) => (requested_action_type,cultivation_id) => {
    return query(state)( (e) => (e.cultivation_id ===requested_action_type && e.cultivation_id === cultivation_id) );
};
*/

export const findAllByType = (state) => (type) => {
    return query(state)( (e) => (e.type === type) );
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
    findAllByCultivation: findAllByCultivation,
    findAllByCultivationAndType: findAllByCultivationAndType,
    find: find,
    query: query,
    queryIndex: queryIndex,
};
