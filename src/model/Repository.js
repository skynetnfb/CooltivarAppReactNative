import Cultivation, {CULTIVATION_SCHEMA, CultivationSchema} from './Cultivation';
import CultivAction, {CultivActionSchema}from './CultivAction';
import Field,{FieldSchema} from './Field';
let Realm = require('realm');
let realm = new Realm({ path: 'db.realm', schema: [Cultivation.schema,CultivAction.schema,Field.schema] });



//------------------------------------------Cultivation START----------------------------------------------------------//

export const createCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Empty cultivation cant be saved'
    }
    // check if already existed?
    //if (checkIfCultivationExists(cultivation.id)) {
    //    throw 'Duplicated ID';
    //}
    try {
        realm.write(() => {
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
        console.log('----------------------------------------------------SCHEMA: ',realm.schema);
        let result = realm.objects(CULTIVATION_SCHEMA);
        console.log('----------------------------------------------------get all result: ',result);
        if(result === undefined) return {};
        return result
    } catch(e) {
        return [];
    } finally {}
};

export const getCultivationById = (id: number) => {
    let cultivations = getAllCultivations().result;
    console.log('----------------------------------------------------cultivations: ',cultivations);
    let findCultivation = cultivations.filtered(`id=${id}`); // return collections
    if (findHero.length == 0) {
        //return = {}
        throw `Not found hero with id=${id}`;
    } else {
         return findCultivation[0];
    }
};

export const updateCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Empty cultivation cant be saved'
    }
    let findCultivation = getCultivationById(cultivation.id).result;
    if (!findCultivation) {
        throw 'No Cultivation Found';
    }
    try {
        realm.write(() => {
            cultivation.updateObjectInfo(findCultivation);
        });
        return true;
    } catch(e) {
        return false
    } finally {
        throw 'Error Updating Cultivation: ${e.message}';
    }
};

export const deleteCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Invalid input!';
    }

    let findCultivation = getCultivationById(cultivation.id).result;
    if (!findCultivation) {
        return false;
    }
    try {
        realm.write(() => {
            realm.delete(findCultivation);
        });
        return true;
    } catch(e) {
        msg.result = false;
        throw 'Error Updating Cultivation: ${e.message}';
    } finally {}
};


const checkIfCultivationExists = (id: number) => {
    let cultivation = getCultivationById(id).result;
    return cultivation != null;
};
//------------------------------------------Cultivation END------------------------------------------------------------//




//------------------------------------------CultivAction START----------------------------------------------------------//
export const createCultivAction = (cultivAction: CultivAction) => {
    if (!cultivAction) {
        throw 'Empty cultivAction cant be saved'
    }
    // check if hero already existed?
    if (checkIfCultivActionExists(cultivAction.id)) {
        throw 'Duplicated ID';
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

export const getCultivActionById = (id: number) => {
    let cultivActions = getAllCultivActions().result;
    let findCultivAction = cultivActions.filtered(`id=${id}`); // return collections
    if (findCultivAction.length == 0) {
        //return = {}
        throw `Not found CultivAction with id=${id}`;
    } else {
        return findCultivAction[0];
    }
};

export const updateCultivAction = (cultivAction: CultivAction) => {
    if (!cultivAction) {
        throw 'Empty cultiv Action cant be saved'
    }
    let findcultivAction = getCultivationById(cultivAction.id).result;
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
    } finally {
        throw 'Error Updating Cultiv Action: ${e.message}';
    }
};

export const deleteCultivAction = (cultivAction: CultivAction) => {
    if (!cultivAction) {
        throw 'Invalid input!';
    }
    let findcultivAction = getcultivActionById(cultivAction.id).result;
    if (!findcultivAction) {
        return false;
    }
    try {
        realm.write(() => {
            realm.delete(findcultivAction);
        });
        return true;
    } catch(e) {
        msg.result = false;
        throw 'Error Updating Cultiv Action: ${e.message}';
    } finally {}
};

const checkIfCultivActionExists = (id: number) => {
    let cultivation = getCultivActionById(id).result;
    return cultivation != null;
};

//------------------------------------------Cultiv Action END----------------------------------------------------------//




//------------------------------------------FIELD START----------------------------------------------------------------//


export const createField = (field: Field) => {
    if (!field) {
        throw 'Empty cultivAction cant be saved'
    }
     //check if Field already existed?
    if (checkIfFieldExists(field.id)) {
        throw 'Duplicated ID';
    }
    try {
        realm.write(() => {
            realm.create('Field', field.getRealmObject());
        });
        return field.id;
    } catch(e) {
        throw 'Error Creating cultivAction: ${e.message}';
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

export const getFieldById = (id: number) => {
    let fields = getAllFields();
    let stringID = id.toString();
    let numbID =+ id;
    try{
        let findField = fields.filtered(`id="${stringID}"`);
        return findField[0]
    }catch(e){
        return null;
    }
     // return collections
    /*console.log('-----------#################*********##############------------ID:',id);
    if (findField.length == 0) {
        //return = {}
        throw `Not found FIELD with id=${id}`;
    } else {
        return findField[0];
    }*/
};

export const updateField = (field: Field) => {
    if (!field) {
        throw 'Empty Field cant be saved'
    }
    //TODO result
    let findField = getFieldById(field.id).result;
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
    } finally {
        throw 'Error Updating Field : ${e.message}';
    }
};

export const deleteField = (field: Field) => {
    if (!Field) {
        throw 'Invalid input!';
    }
    let findField = getfieldById(field.id).result;
    if (!findField) {
        return false;
    }
    try {
        realm.write(() => {
            realm.delete(findField);
        });
        return true;
    } catch(e) {
        msg.result = false;
        throw 'Error Updating Field: ${e.message}';
    } finally {}
};

const checkIfFieldExists = (id: number) => {
    let field = getFieldById(id);
    return field != null;
};


//------------------------------------------FIELD END------------------------------------------------------------------//
