export const CULTIV_ACTION_SCHEMA ='CultivAction';

export default class CultivAction {
    id:'string';
    description:'string';
    startDate: 'date';
    endDate: 'date';
    status:'string';
    type:'string';
    cultivation_id:'string';

    constructor( description,startDate,endDate, status, type,cultivation_id) {
        this.id = new Date().getTime().toString();
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.type = type;
        this.cultivation_id = cultivation_id;
    }

    getRealmObject() {
        return {
            id: this.id,
            description: this.description,
            startDate: this.startDate,
            endDate: this.endDate,
            status: this.status,
            type: this.type,
            cultivation_id:this.cultivation_id,
        };
    }

    updateObjectInfo(cultivAction: any) {
        if (!cultivAction)
            return;
        cultivAction['name'] = this.name;
        cultivAction['description'] = this.description;
        cultivAction['startDate'] = this.startDate;
        cultivAction['endDate'] = this.endDate;
        cultivAction['status'] = this.status;
        cultivAction['type'] = this.type;
        cultivAction['cultivation_id'] = this.cultivation_id
    }
}

export const CultivActionSchema = {
    name: CULTIV_ACTION_SCHEMA,
    properties: {
        id:'string',
        description:'string',
        startDate: 'date',
        endDate: 'date',
        status:'string',
        type:'string',
        cultivation_id:'string'
    }
};

CultivAction.schema = CultivActionSchema;
