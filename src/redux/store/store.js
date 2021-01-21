import React from 'react';
import {createStore} from 'redux';
import Field from '../../model/Field';
import reducer from '../reducer/reducer';

const initialState = {
    fields: [
        new Field('field_1', 'Agrigento', 'primo agr test'),
        new Field('field_2', 'Frosinone', 'fros desc test'),
        new Field('field_3', 'Termini', 'term desc test'),
        new Field('field_4', 'Terni', 'tern desc test'),
    ]
};

const store = createStore(reducer);

export {store, initialState};
