import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import Field from '../../model/Field';
import {reducer} from '../reducer';
import Cultivation from '../../model/Cultivation';

import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // stateReconciler: autoMergeLevel2
};



const persistentReducer = persistReducer(persistConfig, reducer); // create a persisted reducer

export const store = createStore(
    persistentReducer,
    // compose(...
    applyMiddleware(...[thunk]) // add any middlewares here
    // )
);

export const persistor = persistStore(store);

