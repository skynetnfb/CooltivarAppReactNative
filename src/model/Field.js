export const FIELD_SCHEMA ='Field';


export default class Field {
    static counter: number = 0;
    id: string;
    name: string;
    city: string;
    description: string;
    coordinate: string | {latitude: number, longitude: number};
    image: string;

    // non-persistent
    weather: string = null;
    forecast: string[] = [];
    forecastTime: number;
    weatherTime: number;

    constructor(name: string, city: string, description: string, coordinate: string | {latitude: number, longitude: number}, image: string) {
        this.id =  new Date().getTime() + "" + Field.counter++;
        this.name = name;
        this.city = city;
        this.description = description;
        this.coordinate = coordinate || [];
        this.image = image || null; // || new ArrayBuffer();
    }

    getRealmObject():Field { return this.updateObjectInfo({}); }

    updateObjectInfo(field: Field):Field {
        if (!field) return null;
        field.id = this.id;
        field.name = this.name;
        field.city = this.city;
        field.description = this.description;
        field.coordinate = this.coordinate; // asSerializable ? JSON.stringify(this.coordinate) : this.coordinate;
        field.image = this.image;
        return field; }

     clone(fieldJson: Field): void {
        this.updateObjectInfo.call(fieldJson, this);
     }

    static getLoadingPlaceholder(): Field {
        const l = 'Loading...';
        const f = new Field(l, l, l, null, null);
        f.id = -1;
        return f;
    }
    static isLoadingPlaceholder(field: Field): boolean { return field && field.id === -1; }

}

export const FieldSchema = {
    name: FIELD_SCHEMA,
    properties: {
        id:'string',
        name:'string?',
        city:'string?',
        description:'string?',
        coordinate:'string?',
        image:'string?'
    }
};

Field.schema = FieldSchema;
