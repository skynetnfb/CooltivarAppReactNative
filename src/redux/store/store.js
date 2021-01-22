import React from 'react';
import {createStore} from 'redux';
import Field from '../../model/Field';
import reducer from '../reducer/reducer';
import Cultivation from '../../model/Cultivation';

const initialState = {
    fields: [
        new Field('field_1', 'Agrigento', 'primo agr test'),
        new Field('field_2', 'Frosinone', 'fros desc test'),
        new Field('field_3', 'Termini', 'term desc test'),
        new Field('field_4', 'Terni', 'tern desc test'),
    ],
    cultivations: [
        new Cultivation('cultivation1', 'cultivar1', 'description of cultivation1', '1', new Date(), new Date(), 500, 'Grow', new ArrayBuffer()),
        new Cultivation('cultivation2', 'cultivar2', 'description of cultivation2', '1', new Date(), new Date(), 600, 'Grow', new ArrayBuffer()),
        new Cultivation('cultivation3', 'cultivar3', 'description of cultivation3', '1', new Date(), new Date(), 700, 'Grow', new ArrayBuffer()),
    ],
};

const store = createStore(reducer);

export {store, initialState};
