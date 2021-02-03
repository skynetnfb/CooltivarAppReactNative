import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import Field from '../../model/Field';
import reducer from '../reducer/reducer';
import Cultivation from '../../model/Cultivation';
import CultivAction from '../../model/CultivAction';
import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage'
// import {AsyncStorage} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage'
 import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
/*
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

let storageUsed = typeof window === "undefined" ? createNoopStorage() : createWebStorage();
*/
//new Refactor
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // stateReconciler: autoMergeLevel2
};

/*
export default (reducers) => {
    console.log("Funzione configure reducers  store chiamata")
    const middleware = [thunk];
    const enhancers = [applyMiddleware(...middleware)];
    const composeEnhancers = compose;
    const _persistReducer = persistReducer(persistConfig, reducers);
    store = createStore(_persistReducer,composeEnhancers(...enhancers));
    const persistor = persistStore(store);
    return {store, persistor};
};*/
///////////////


const persistentReducer = persistReducer(persistConfig, reducer) // create a persisted reducer

const store = createStore(
    persistentReducer,
    // compose(...
    applyMiddleware(...[thunk]) // add any middlewares here
    // )
)

const persistor = persistStore(store);

export {store, persistor};
