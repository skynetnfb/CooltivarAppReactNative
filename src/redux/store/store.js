import React from 'react';
import {createStore} from 'redux';
import Field from '../../model/Field';
import reducer from '../reducer/reducer';
import Cultivation from '../../model/Cultivation';
import CultivAction from '../../model/CultivAction';

export class AppState {
    fields: Field[];
    cultivations: Cultivation[];
    cultivActions: CultivAction[];
    user: any;
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
};

//TODO
//initialState.cultivations[0].id = '1611331189935';
const store = createStore(reducer);

export {store, initialState};
