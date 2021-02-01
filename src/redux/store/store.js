import React from 'react';
import {createStore,applyMiddleware,compose} from 'redux';
import Field from '../../model/Field';
import reducer from '../reducer/reducer';
import Cultivation from '../../model/Cultivation';
import CultivAction from '../../model/CultivAction';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export class AppState {
    fields: Field[];
    cultivations: Cultivation[];
    cultivActions: CultivAction[];
    user: any;
    loading:true;
    logged:false;
}

const initialState: AppState = {
    /*fields: [
        new Field('field_1', 'Agrigento', 'primo agr test', '[]'),
        new Field('field_2', 'Frosinone', 'fros desc test', '[]'),
        new Field('field_3', 'Termini', 'term desc test', '[]'),
        new Field('field_4', 'Terni', 'tern desc test', '[]'),
    ],*/
    fields: [],
    cultivations: [
        //new Cultivation('MOCK', 'cultivar1', 'description of cultivation1', '1', new Date(), new Date(), 500, 'Grow', null),
    ],
    cultivActions:[],
    user:null,
    logged:false,
    loading:true,
};



export {initialState};
//new Refactor
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2
};

export let store=null;

/*export default reducers => {
    const middleware = [thunk];
    const enhancers = [applyMiddleware(...middleware)];
    const composeEnhancers = compose;
    const _persistReducer = persistReducer(persistConfig, reducers);
    const store = createStore(_persistReducer, composeEnhancers(...enhancers));
    const persistor = persistStore(store);
    return {_store, persistor};
};*/

export default (reducers) => {
    console.log("Funzione configure reducers  store chiamata")
    const middleware = [thunk];
    const enhancers = [applyMiddleware(...middleware)];
    const composeEnhancers = compose;
    const _persistReducer = persistReducer(persistConfig, reducers);
    store = createStore(_persistReducer,composeEnhancers(...enhancers));
    const persistor = persistStore(store);
    return {store, persistor};
};
/*
const middleware = [thunk];
const enhancers = [applyMiddleware(...middleware)];
const composeEnhancers = compose;
const _persistReducer = persistReducer(persistConfig, reducer);
_store = createStore(_persistReducer,composeEnhancers(...enhancers));
export const persistor = persistStore(_store);
*/
//export const store = _store;
//export const store = createStore(reducer);
