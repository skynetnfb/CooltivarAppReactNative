import Cultivation, {CULTIVATION_SCHEMA} from './Cultivation';
import CultivAction from './CultivAction';
import Field from './Field';
import FirebaseAuth from '../utils/FirebaseAuth';
import firebase from 'firebase';

    let Realm = require('realm');
    let userDbPath = null;
/*
    export const firebaseConfig = {
        apiKey: 'AIzaSyC_F98EhQTmgzbbalgnYqQFpCgOXcgcnxs',
        authDomain: 'reactcooltivarapp.firebaseapp.com',
        databaseURL: '',
        projectId: 'reactcooltivarapp',
        storageBucket: 'reactcooltivarapp.appspot.com',
        messagingSenderId: '461253967081',
        appId: '1:461253967081:web:6c21b324129a2319960478',
        measurementId: '',
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }


    if(firebase.auth().currentUser!=null){userDbPath = firebase.auth().currentUser.email;
    console.log('!!!!!-----------------LOGGED USER : ',firebase.auth().currentUser.email);
    console.log('!!!!!-----------------DB USER : ',userDbPath);}
    */
    let realm = null;
    export const initRealm =function(userDbPath){
       realm = new Realm({ path: userDbPath+'db.realm', schema: [Cultivation.schema,CultivAction.schema,Field.schema] });
       return realm;
    };



export const createCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Empty cultivation cant be saved'
    }
    // check if already existed?
    //if (checkIfCultivationExists(cultivation.id)) {
    //   throw 'Duplicated ID';
    //}
    while (checkIfCultivationExists(cultivation.id))
    {
        //creco un nuovo elemento con id diverso CULTIVATION constructor(name, cultivar, description, field_id, sowingDate, harvestDate, harvestWeight, status, preview)
        cultivation = new CultivAction(cultivation.name,cultivation.cultivar,cultivation.field_id,cultivation.sowingDate,cultivation.harvestDate,cultivation.harvestDate,cultivation.status,cultivation.preview)
    }
    try {
        realm.write(() => {
            console.log('-----------------------realmOBJ',cultivation.getRealmObject());
            realm.create(CULTIVATION_SCHEMA, cultivation.getRealmObject());
        });
        return cultivation.id;
    } catch(e) {
        throw 'Error Creating Cultivation: ${e.message}';
    } finally {}
};

// result: realm objects
export const getAllCultivations = () => {
    try {
        //console.log('----------------------------------------------------SCHEMA: ',realm.schema);
        let result = realm.objects(CULTIVATION_SCHEMA);
        //console.log('----------------------------------------------------get all result: ',result);
        //if(result.length == 0) return {};
        return result
    } catch(e) {
        return [];
    } finally {}
};

export const getCultivationById = (id: string) => {
    let cultivations = getAllCultivations();
    console.log('----------------------------------------------------cultivations: ',cultivations);
    try{
        let findCultivation = cultivations.filtered(`id="${id}"`); // return collections
        return findCultivation[0];
    }catch(e){
        return null;
    }

};

export const updateCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Empty cultivation cant be saved'
    }
    let findCultivation = getCultivationById(cultivation.id);
    if (!findCultivation) {
        throw 'No Cultivation Found';
    }
    try {
        console.log('###------------------------------updateCultivation Prima del WRITE :REALM CULT ',findCultivation);
        console.log('###------------------------------updateCultivation Prima del WRITE cultivation:',cultivation);
        realm.write(() => {
            cultivation.updateObjectInfo(findCultivation);
        });
        console.log('###------------------------------ UPDATED WRITE :');
        return true;
    } catch(e) {
        return false
    }
};

export const deleteCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Invalid input!';
    }

    let findCultivation = getCultivationById(cultivation.id);
    if (!findCultivation) {
        return false;
    }
    try {
        realm.write(() => {
            realm.delete(findCultivation);
        });
        return true;
    } catch(e) {
        throw 'Error Updating Cultivation: ${e.message}';
    } finally {}
};


const checkIfCultivationExists = (id: number) => {
    let cultivation = getCultivationById(id);
    return cultivation != null;
};
//------------------------------------------Cultivation END------------------------------------------------------------//




//------------------------------------------CultivAction START----------------------------------------------------------//
export const createCultivAction = (cultivAction: CultivAction) => {
    if (!cultivAction) {
        throw 'Empty cultivAction cant be saved'
    }
    // check if hero already existed?
    while (checkIfCultivActionExists(cultivAction.id))
    {
        //creco un nuovo elemento con id diverso constructor( description,startDate,endDate, status, type,cultivation_id)
        cultivAction = new CultivAction(cultivAction.description, cultivAction.startDate,cultivAction.endDate,cultivAction.status,cultivAction.type,cultivAction.cultivation_id)
    }
    try {
        realm.write(() => {
            realm.create('CultivAction', cultivAction.getRealmObject());
        });
        return cultivAction.id;
    } catch(e) {
        throw 'Error Creating cultivAction: ${e.message}';
    } finally {}
};


// result: realm objects
export const getAllCultivActions = () => {
    try {
        return realm.objects('CultivAction');
    } catch(e) {
        return [];
    } finally {}
};

export const getCultivActionById = (id: string) => {
    let cultivActions = getAllCultivActions();
    try {
        let findCultivAction = cultivActions.filtered(`id="${id}"`); // return collections
        return findCultivAction[0];
    }catch(e){
        return null;
    }
};

export const updateCultivAction = (cultivAction: CultivAction) => {
    if (!cultivAction) {
        throw 'Empty cultiv Action cant be saved'
    }
    let findcultivAction = getCultivActionById(cultivAction.id);
    if (!findcultivAction) {
        throw 'No cultiv Action Found';
    }
    try {
        realm.write(() => {
            cultivAction.updateObjectInfo(findcultivAction);
        });
        return true;
    } catch(e) {
        return false
    }
};

export const deleteCultivAction = (cultivAction: CultivAction) => {
    console.log('DENTRO DELETE INIZIO');
    if (!cultivAction) {
        throw 'Invalid input!';
    }
    let findcultivAction = getCultivActionById(cultivAction.id);
    if (!findcultivAction) {
        console.log('DENTRO DELETE NON TROVATA');
        return false;
    }
    try {
        realm.write(() => {
            console.log('DENTRO DELETE PRIMA WRITE');
            realm.delete(findcultivAction);
            console.log('DENTRO DELETE DOPO WRITE')
        });
        return true;
    } catch(e) {
        throw 'Error Deleting Cultiv Action: ${e.message}';
    }
};

const checkIfCultivActionExists = (id: number) => {
    let cultivation = getCultivActionById(id);
    return cultivation != null;
};

//------------------------------------------Cultiv Action END----------------------------------------------------------//




//------------------------------------------FIELD START----------------------------------------------------------------//


export const createField = (field: Field) => {
    if (!field) { throw 'Empty field cant be saved'; }
        //check if Field already existed?
        /*while (checkIfFieldExists(field.id))
        {
           // field = new Field(field.name, field.description)
        }*/
    try {
        realm.write(() => {
            realm.create('Field', field.getRealmObject());
        });
        return field.id;
    } catch(e) {
        throw 'Error Creating field: ' + e;
    } finally {}
};

export const getAllFields = () => {
    try {
        //console.log('Field Realm schema:',realm.schema);
        console.log('-------------------------------------------realm.objects LENGTH ',realm.objects('Field').length);
        let fields = realm.objects('Field');
        return fields
    } catch(e) {
        return [];
    }
};

export const getFieldById = (id: string) => {
    let fields = getAllFields();
    //let stringID = id.toString();
    //let numbID =+ id;
    try{
        let findField = fields.filtered(`id="${id}"`);
        return findField[0]
    }catch(e){
        return null;
    }
};

export const updateField = (field: Field) => {
    if (!field) {
        throw 'Empty Field cant be saved'
    }
    //TODO result
    let findField = getFieldById(field.id);
    if (!findField) {
        throw 'No Field Found';
    }
    try {
        realm.write(() => {
            field.updateObjectInfo(findField);
        });
        return true;
    } catch(e) {
        return false
    }
};

export const deleteField = (field: Field) => {
    if (!Field) {
        throw 'Invalid input!';
    }
    let findField = getFieldById(field.id);
    if (!findField) {
        return false;
    }
    try {
        realm.write(() => {
            realm.delete(findField);
        });
        return true;
    } catch(e) {
        throw 'Error Updating Field: ${e.message}';
    } finally {}
};

const checkIfFieldExists = (id: string) => {
    return false;
    let field = getFieldById(id);
    return field != null;
};


//------------------------------------------- FIELD END --------------------------------------------------------------//


//----------------------------------------- EXPORT BUNDLES -----------------------------------------------------------//
export const CultivationDB = {
    insert: createCultivAction,
    update: updateCultivation,
    delete: deleteCultivation,
    findAll: getAllCultivations,
    find: getCultivationById,
    check: checkIfCultivationExists
};
export const CultivActionDB = {
    insert: createCultivAction,
    update: updateCultivAction,
    delete: deleteCultivAction,
    findAll: getAllCultivActions,
    find: getCultivActionById,
    check: checkIfCultivActionExists
};
export const FieldDB = {
    insert: createField,
    update: updateField,
    delete: deleteField,
    findAll: getAllFields,
    find: getFieldById,
    check: checkIfFieldExists,
};

//----------------------------------------- EXPORT BUNDLES END -------------------------------------------------------//
