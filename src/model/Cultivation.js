export const CULTIVATION_SCHEMA ='Cultivation';

export default class Cultivation {
    id:  'string';
    name: 'string';
    cultivar: 'string';
    description: 'string';
    field_id: 'string';
    sowingDate:'date';
    harvestDate:'date';
    harvestWeight: 'int';
    status:'string';
    preview:'data';


    constructor(name, cultivar, description, field_id, sowingDate, harvestDate, harvestWeight, status, preview) {
        this.id = new Date().getTime().toString();
        this.name = name;
        this.cultivar = cultivar;
        this.description = description;
        this.field_id = field_id;
        this.sowingDate = sowingDate;
        this.harvestDate = harvestDate;
        this.harvestWeight = harvestWeight;
        this.status = status;
        this.preview = preview;
    }

    getRealmObject() {
        return {
            id:this.id,
            name:this.name,
            cultivar:this.cultivar,
            description:this.description,
            field_id:this.field_id,
            sowingDate:this.sowingDate,
            harvestDate:this.harvestDate,
            harvestWeight:this.harvestWeight,
            status:this.status,
            preview:this.preview,
        };
    }

    updateObjectInfo(cultivation: any) {
        if (!cultivation)
            return;
        cultivation['id'] = this.id;
        cultivation['name'] = this.name;
        cultivation['cultivar'] = this.cultivar;
        cultivation['description'] = this.description;
        cultivation['field_id'] = this.field_id;
        cultivation['sowingDate'] = this.sowingDate;
        cultivation['harvestDate'] = this.harvestDate;
        cultivation['harvestWeight'] = this.harvestWeight;
        cultivation['status'] = this.status;
        cultivation['preview'] = this.preview;
    }
}

export const CultivationSchema = {
    name: CULTIVATION_SCHEMA,
    properties: {
        id:  'string?',
        name: 'string?',
        cultivar: 'string?',
        description: 'string?',
        field_id: 'int?',
        sowingDate:'date?',
        harvestDate:'date?',
        harvestWeight: 'int?',
        status:'string?',
        preview:'data?',
    }
};

Cultivation.schema = CultivationSchema;
