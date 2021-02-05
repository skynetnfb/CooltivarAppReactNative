import React from 'react';
import {StyleSheet, View, Image, Button, TouchableOpacity, BackHandler} from 'react-native';
import {Text} from 'react-native';
import {STYLE, COLOR} from '../../styles';
import {CultivationSelector} from '../../redux/selector';
import {connect} from 'react-redux';
import {
    DELETE_FIELD_ACTION_REQ,
    FIND_FIELD_ACTION_REQ,
    METEO_TODAY_REQUEST,
    THUNKED_WEATHER_TODAY,
    INSERT_FIELD_ACTION_REQ,
    UPDATE_FIELD_ACTION_REQ,
    FIND_CULTIVATION_ACTION_REQ,
    INSERT_CULTIVATION_ACTION_REQ
} from '../../redux/action/action_dispatchers';
import {FieldSelector} from '../../redux/selector';
import Field from '../../model/Field';
import FieldMap from './FieldMap';
import {WEATHER_ICON} from '../../utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../abstract/ModalComponent';
import {store} from '../../redux/store';

class FieldDetailComponent extends FieldMap{
    constructor(props) {
        super(props);
    }

    editClicked = function(){
        console.log('__fd edit clicked');
        const field_id = this.getField().id;
        this.props.navigation.navigate('field_form', {id: field_id});
    }.bind(this);

    resultDeleteModalCallback = function(result: boolean): void{
        console.log('__fd delete dialog clicked', result);
        if (!result) return;
        console.log('__fd delete dialog confirmed', this.getField().id);
        // this.props.navigation.goBack(null);
        this.props.navigation.pop();
        // setTimeout(() => this.props.delete_field_action(this.getField().id), 1);
        this.props.delete_field_action(this.getField().id);
    }.bind(this);

    componentDidMount(): void {
        //BackHandler.addEventListener("hardwareBackPress", this.backAction);
        // one time only e solo se non ha già caricato i dati meteo e non sono troppo vecchi.
        const field: Field = this.getField();
        const hours = 1000 * 60 * 60;
        if (field.weather && (field.weatherTime >= new Date().getTime() - 1 * hours)) return;
        const coord = this.getCenter(field.coordinate);
        console.log('__fd select meteo:', coord, field.id);
        // this.props.get_meteo_today_action(coord, field.id);
        console.log('mthunk fd dispatching( ', this.props.get_meteo_today_THUNKED(coord, field.id));
        store.dispatch(this.props.get_meteo_today_THUNKED(coord, field.id));
    }
/*
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        this.props.navigation.navigate('Cultivations');
    }*/

    shouldComponentUpdate(): boolean {
        // shouldComponentUpdate() è chiamato prima di render
        // componentDidUpdate() è chiamato dopo.
        const coordinate = this.getCoordinate(); // from local state
        const field = this.getField(); // from props
        // todo: stopUpdatingGui should = false per evitare di continuare ad aggiornare gui prima dell'update dello stato, ma interrompe anche la chiamata che dovrebbe triggerare con il setState()
        const stopUpdatingGui = true;
        const continueUpdatingGui = true;
        console.log('__fd shouldUpdate()', this.props.navigation);

        //this.props.navigation.setOptions({headerTitle: "Field:" + field.name});
        if (coordinate.length !== field.coordinate.length) {
            console.log('__fd shouldUpdate() different length updated');
            this.setCoordinate(field.coordinate);
            return stopUpdatingGui;
        }
        for (let i = 0; i < coordinate.length; i++) {
            if (coordinate[i].latitude !== field.coordinate[i].latitude || coordinate[i].longitude !== field.coordinate[i].longitude){
                console.log('__fd shouldUpdate() different coord values updated');
                this.setCoordinate(field.coordinate)
                return stopUpdatingGui;
            }
        }
        console.log('__fd shouldUpdate() coord not updated', coordinate, field.coordinate);
        return continueUpdatingGui;
    }

    render() {
        console.log('field detail props:', this.props);
        const field: Field = this.props.field;
        const fields: Field[] = this.props.fields;
        const coordinates = []; //routeParams2 && routeParams2.coordinates || [];
        const mapComponent = super.render();
        let modalChildren =
            <Icon
                name="trash-sharp"
                size={40}
                color={this.props.cultivations.length === 0 ? "white" : COLOR.DARK_ORANGE}
            />;

        let ret =
            <View style={[STYLE.rowContainer, STYLE.fill, styles.root]}>
                <View style={[STYLE.title_background, styles.title_background]}>
                    <Text style={[STYLE.title_text]}>{"Field: " + field.name}</Text>
                </View>
                {mapComponent}
                <View style={[STYLE.rowContainer, STYLE.card, STYLE.fill, styles.card]}>
                    <View style={[STYLE.columnContainer]}>
                        <Text style={[STYLE.centerColumn, STYLE.fill, styles.city]}>{"City: " + field.city}</Text>
                        <Image style={[STYLE.centerColumn, STYLE.weather_icon]}
                               source={ WEATHER_ICON.get(field.weather) }
                        />

                    </View>
                    <View style={[STYLE.fill, STYLE.columnContainer, styles.body]}>
                        <Text style={[STYLE.centerColumn]}>{field.description}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[STYLE.footer]}
                    onPress={()=>this.props.navigation.navigate('field_form')}>
                    {
                        this.props.cultivations.length ?
                            <ModalComponent
                                style = {[/*ignored*/]}
                                modalMessage = {"Cannot delete a field used in cultivations."}
                                buttonLeft={"ok"}
                                buttonRight={null}
                                todo = { "modal body che cambia: se hai 0 coltivazioni fa solo un warn (you cannot...) altrimenti richiede confirm-undo"}
                            >{modalChildren}</ModalComponent>
                            :
                            <ModalComponent
                                style = {[/*ignored*/]}
                                modalMessage = {"Field will be deleted! Are You Sure?"}
                                buttonLeft={"Undo"}
                                buttonRight={"Confirm"}
                                result = {this.resultDeleteModalCallback}
                                todo = { "modal body che cambia: se hai 0 coltivazioni fa solo un warn (you cannot...) altrimenti richiede confirm-undo"}
                            >{modalChildren}</ModalComponent>
                    }
                    <Icon style={[ ]}
                          name={'create'}
                          size={40}
                          color={"white"}
                          onPress={this.editClicked}
                    />
                </TouchableOpacity>
            </View>;
        return ret;
    }
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
    },
    card: {/*
        backgroundColor: 'gray',
        borderWidth: 5,
        borderColor: 'black',*/
    },
    map: {
        height: 200,
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'gray',
    },
    title_background: {
        // marginBottom: 8,
    },
    city: {
        fontSize: 20,
        color: COLOR.MAIN,
    },
    body: {
        // backgroundColor: 'red',
    },
    edit_button:{
        maxHeight: '100%'
    },
});



const mapStateToProps = (state, props) => {
    const routeParamsLv1 = props.route && props.route.params;
    const routeParamsLv2 = routeParamsLv1 && routeParamsLv1.route && routeParamsLv1.route.params;
    let fieldID = (routeParamsLv2 || routeParamsLv1 || {}).id; // .route.params.id;
    let addProps = {};

    console.log("xxxxx mapstatetoprops:", addProps, "state:", state, 'FieldID', fieldID);
    console.log("xxxxx routeParams Lv1:", routeParamsLv1);
    console.log("xxxxx routeParams Lv2:", routeParamsLv2);
    const emptyField = new Field("namee", "cityy", "descc", "[]", null);
    emptyField.coordinate = [{latitude: 42.18530921673116, longitude: 14.420321434736252}, {latitude: 42.1852602756412, longitude: 14.42043274641037}, {latitude: 42.185234190273235, longitude: 14.420227222144606}];
    addProps.field = FieldSelector.find(state)(fieldID);
    console.log("xxxxx addProps.field:", addProps.field );
    addProps.isUpdate = !!fieldID;
    addProps.fields = FieldSelector.findAll(state)();
    addProps.cultivations = CultivationSelector.findByField(state)(fieldID);
    addProps.fields = addProps.fields.filter( field => addProps.field && (field.id !== addProps.field.id)) || [];
    addProps.allowEditPolygon = false;
    console.log("xxxxx addProps:", addProps, "state:", state, 'FieldID', fieldID);
    // addProps.field.coordinate = JSON.parse(addProps.field.coordinate);
    console.log("xxxxx addProps 1:", addProps, "state:", state, 'FieldID', fieldID);
    //for (const f of addProps.fields) { f.coordinate = JSON.parse(f.coordinate); }
    console.log("xxxxx addProps 2:", addProps, "state:", state, 'FieldID', fieldID);

    // addProps.field = JSON.parse(JSON.stringify(addProps.field));
    // addProps.fields = JSON.parse(JSON.stringify(addProps.fields));
    console.log('state map return:', addProps);
    console.log('state map fieldID:', fieldID);
    addProps.field = addProps.field || new Field();
    return addProps;
};

const mapDispatchToProps = (dispatch) => {
    return {
        find_field_action: FIND_FIELD_ACTION_REQ(dispatch),
        get_meteo_today_action: METEO_TODAY_REQUEST(dispatch),
        get_meteo_today_THUNKED: THUNKED_WEATHER_TODAY,
        delete_field_action: DELETE_FIELD_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldDetailComponent);

// export default FieldDetailComponent;
