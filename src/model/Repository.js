import Cultivation, {CULTIVATION_SCHEMA} from './Cultivation';
import CultivAction from './CultivAction';
import Field from './Field';

let Realm = require('realm');
let realm = null;

export const initRealm =function(userDbPath){
    realm = new Realm({ path: userDbPath+'db.realm', schema: [Cultivation.schema,CultivAction.schema,Field.schema] });
    return realm;
};

export const createCultivation = (cultivation: Cultivation) => {
    if (!cultivation) {
        throw 'Empty cultivation cant be saved'
    }
    while (checkIfCultivationExists(cultivation.id))
    {
        cultivation = new CultivAction(cultivation.name,cultivation.cultivar,cultivation.field_id,cultivation.sowingDate,cultivation.harvestDate,cultivation.harvestDate,cultivation.status,cultivation.preview)
    }
    try {
        realm.write(() => {
            realm.create(CULTIVATION_SCHEMA, cultivation.getRealmObject());
        });
        return cultivation.id;
    } catch(e) {
        throw 'Error Creating Cultivation: ' + e;
    } finally {}
};

// result: realm objects
export const getAllCultivations = () => {
    try {
        return realm.objects(CULTIVATION_SCHEMA);
    } catch(e) {
        return [];
    } finally {}
};

export const getCultivationById = (id: string) => {
    let cultivations = getAllCultivations();
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
        realm.write(() => {
            cultivation.updateObjectInfo(findCultivation);
        });
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


//------------------------------------------Cultiv_Action START----------------------------------------------------------//
export const createCultivAction = (cultivAction: CultivAction) => {
    if (!cultivAction) {
        throw 'Empty cultivAction cant be saved'
    }
    // check already existed?
    while (checkIfCultivActionExists(cultivAction.id))
    {
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

export const getAllCultivActionsByCultivationId = (cultivation_id: string) => {
    let cultivActions = getAllCultivActions();
    try {
        let findCultivAction = cultivActions.filtered(`cultivation_id="${cultivation_id}"`); // return collections
        return findCultivAction;

    }catch(e){
        console.log('--------------REPOSITORY ERROR------------- ',);
        return null;
    }
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
        let fields = realm.objects('Field');
        return fields
    } catch(e) {
        return [];
    }
};

export const getFieldById = (id: string) => {
    let fields = getAllFields();
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
    findAllByCultivation: getAllCultivActionsByCultivationId,
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
