export const FIELD_SCHEMA ='Field';


export default class Field {
    static counter = 0;
    id:'string';
    name:'string';
    city:'string';
    description:'string';
    coordinate:'string';
    image: ArrayBuffer;

    constructor(name, city, description, coordinate, image) {
        this.id =  new Date().getTime() + "" + Field.counter++;
        this.name = name;
        this.city = city;
        this.description = description;
        this.coordinate = coordinate || '[]';
        this.image = image || null; // || new ArrayBuffer();
    }

    getRealmObject() { return this.updateObjectInfo({}, true); }

    updateObjectInfo(field, asSerializable = false) {
        if (!field) return null;
        field.id = this.id;
        field.name = this.name;
        field.city = this.city;
        field.description = this.description;
        field.coordinate = this.coordinate; // asSerializable ? JSON.stringify(this.coordinate) : this.coordinate;
        field.image = this.image;
        return field;
    }
}

export const FieldSchema = {
    name: FIELD_SCHEMA,
    properties: {
        id:'string',
        name:'string?',
        city:'string?',
        description:'string?',
        coordinate:'string?',
        image:'data?'
    }
};

Field.schema = FieldSchema;
