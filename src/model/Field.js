export const FIELD_SCHEMA ='Field';


export default class Field {
    id:'string';
    name:'string';
    city:'string';
    description:'string';

    constructor( name, city, description) {
        this.id = new Date().getTime().toString();
        this.name = name;
        this.city = city;
        this.description = description;

    }

    getRealmObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
        };
    }

    updateObjectInfo(field: any) {
        if (!field)
            return;
        field['id'] = this.id;
        field['name'] = this.name;
        field['description'] = this.description;
    }
}

export const FieldSchema = {
    name: FIELD_SCHEMA,
    properties: {
        id:'string',
        name:'string?',
        description:'string?',
    }
};

Field.schema = FieldSchema;
