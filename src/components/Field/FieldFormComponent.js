import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet, View, Image, Button, LogBox,
    SafeAreaView, TouchableHighlight, TouchableOpacity
} from 'react-native';
import {Text, TextInput} from 'react-native';
import {STYLE, MAIN_COLOR, MAP_LABEL_STYLE, COLOR} from '../../styles/styles';
import MapComponent from '../common/MapComponent';
import EditButton from '../common/EditButton';
import ValidationFailMessage from '../common/ValidationFailMessage';
import ValidationComponent2 from './ValidationComponent2';
import Geolocation, {
    GeolocationError,
    GeolocationOptions,
    GeolocationResponse,
} from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';



import {
    FIND_FIELD_ACTION_REQ,
    INSERT_FIELD_ACTION_REQ,
    UPDATE_FIELD_ACTION_REQ,
} from '../../redux/action/dispatchers/field';
import Icon from 'react-native-vector-icons/Ionicons';
import {FieldSelector} from '../../redux/selector/field';
import Field from '../../model/Field';
import MapView, {Polygon, Marker} from 'react-native-maps';
import {BoundaryHelper} from '../../utils/CoordUtils';
import FieldMap from './FieldMap';

class FieldFormComponent extends FieldMap{

    constructor(props) {
        super(props);
        let field = this.getField();
        this.state = {
            ...this.state,
            pristine: !this.props.isUpdate,
            // coordinateStr: '', settato da setInitialValues
        }
        console.log('setCoordinate init:', [...this.state.coordinate]);

        console.log('__fc constructor 2');
        const validationRules = {
            name: {required:true, minlength:3, maxlength:20, initialValue: field.name, errors:[]},
            city: {required: true, minlength:3, maxlength:20, initialValue: field.city, errors:[]},
            coordinateStr: {required: true, minlength:3, initialValue: this.toUnaryString(this.state.coordinate.length), errors:[]},
            description: {maxlength: 200, initialValue: field.description, errors:[]},
        };

        console.log('__fc constructor 3');
        this.setInitialValues(validationRules);

        console.log('__fc constructor end');
    }

    submit = function(){
        console.log('submitClicked()');
        this.doValidation();
        if (!this.isFormValid()) return;
        this.takeSnapshot();
        // this.props.navigation.back(); // navigate('field', data);
    }.bind(this);

    getUpdatedFieldData = function(): Field {
        const field: Field = {...this.getField() };
        field.name = this.state.name;
        field.city = this.state.city;
        field.description = this.state.description;
        field.coordinate = JSON.stringify(this.state.coordinate);
        field.image = this.state.mapSnapshot;
        return field; }.bind(this);

    finalizeSubmit = function(){
        const fieldRaw: Field = this.getUpdatedFieldData();
        const field = new Field();
        field.clone(fieldRaw);
        console.log('__fc submit field:', field, ' calling action:', this.props.isUpdate ? this.props.update_field : this.props.insert_field);
        this.props.isUpdate ? this.props.update_field(field) : this.props.insert_field(field);
    }.bind(this);

    markerOnDrag = function(syntethicEvent, index) {
        const nativeEvent = syntethicEvent.nativeEvent; /* coordinates: LatLng, position: Point*/
        const coordinate = nativeEvent.coordinate;
        console.log('__fc marker drag, index:', index, 'coordinate', coordinate);
        const coordinates = this.getCoordinate();
        coordinates[index] = coordinate;
        this.setCoordinate(coordinates);
    }.bind(this);

    onPress = function(syntethicEvent) {
        const nativeEvent = syntethicEvent.nativeEvent; /* coordinates: LatLng, position: Point*/
        const coordinate = nativeEvent.coordinate;
        const coordinates = this.getCoordinate();
        coordinates.push(coordinate);
        console.log("__fc syntethicEvent:", syntethicEvent, 'nativeEvent:', nativeEvent);
        console.log("__fc coordinates:", coordinates, 'coordinate:', coordinate);
        this.setCoordinate(coordinates);
        console.log("__fc state:", this.state);
    }.bind(this);

    componentDidMount(): void {
        console.log('__fc componentDidMount');
    }

    render() {
        console.log('__ fc render()');
        const field = this.getField();
        const coordinate = this.getCoordinate();
        console.log('## field:', field, "## coordinate:", coordinate, ' tpyeof coordinate: ', typeof (coordinate));
        const mapComponent = super.render();
        return (
        <View style={[]}>
            <View style={[STYLE.title_background, styles.title_background]}>
                <Text style={[STYLE.title_text]}>{this.props.isUpdate ? "Field update" : "Field create"}</Text>
            </View>
            <View style={[STYLE.rowContainer, STYLE.fill, styles.root, {position: 'relative'}]}>
                <View style={[ STYLE.fill, styles.map]}>
                    {/*  <View coordinates={field.coordinates} />  */}
                    {mapComponent}
                    {/*<TextInput ref="coordinateStr" multiline={false} style={[]} value={this.state.coordinateStr}  /> */}
                    {/*this.isFieldInError('coordinateStr') && this.getErrorsInField('coordinateStr').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>)*/}
                    {this.isFieldInError('coordinateStr') && <ValidationFailMessage>{this.getErrorsInField('coordinateStr')[0]}</ValidationFailMessage>}
                </View>

                <View style={[STYLE.rowContainer, STYLE.card, STYLE.fill, styles.card]}>
                    <TextInput ref="name" multiline={false} onChangeText={(name) => this.onChange({name})}
                               style={[styles.input, styles.name]}
                               value={this.state.name} placeholder={"Field name"} />
                    {this.isFieldInError('name') && <ValidationFailMessage>{this.getErrorsInField('name')[0]}</ValidationFailMessage>}

                    <TextInput ref="city" multiline={false} onChangeText={(city) => this.onChange({city})}
                               style={[styles.input, styles.city]}
                               value={this.state.city}  placeholder={"City"} />
                    {this.isFieldInError('city') && <ValidationFailMessage>{this.getErrorsInField('city')[0]}</ValidationFailMessage>}

                    <View style={[STYLE.fill, STYLE.columnContainer, styles.input, styles.body]}>
                        <TextInput ref="description" multiline={true} onChangeText={(description) => this.onChange({description})}
                                   style={[STYLE.centerColumn, styles.input]}
                                   value={this.state.description} placeholder={"Description"} />
                        {this.isFieldInError('description') && <ValidationFailMessage>{this.getErrorsInField('description')[0]}</ValidationFailMessage>}
                    </View>
                </View>
                <TouchableHighlight onPress={this.submit} style={ [ STYLE.submit, ( !this.state.pristine && this.isFormValid() ? STYLE.submitValid : STYLE.submitInvalid), styles.submit, styles.border ]}>
                    <Text style={[STYLE.centerColumn, STYLE.centerRow]}>{"Submit"}</Text>
                </TouchableHighlight>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        flexGrow: 1,
        marginBottom: 0,
    },
    submit: {
        height: 120,
        marginBottom: 0,
        paddingBottom: 80,
    },
    card: {
        flexBasis: 0,
        minHeight: 170,
        flexWrap: 'nowrap',
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        minHeight: 150,
        flexGrow: 10,
    },
    title_background: {
        width: '100%',
        // marginBottom: 8,
    },
    input:{
    },
    name: {
        fontSize: 20,
        color: MAIN_COLOR,
    },
    city: {
    },
    meteo_image: {
        backgroundColor: 'gray',
        height: 60,
        width: 60,
    },
    body: {
        height: undefined,
        flexGrow: 0,
        // flexShrink: 1
        // backgroundColor: 'red',
    },
    edit_button:{
        height: 60,
        width: 60,
    },

});


const mapStateToProps = (state, props) => {
    let fieldID = props.route && props.route.params && props.route.params.id; // .route.params.id;
    let addProps = {};

    console.log("xxxxx mapstatetoprops:", addProps, "state:", state, 'FieldID', fieldID);
    const emptyField = new Field("namee", "cityy", "descc", "[]", null);
    emptyField.coordinate = [{latitude: 42.18530921673116, longitude: 14.420321434736252}, {latitude: 42.1852602756412, longitude: 14.42043274641037}, {latitude: 42.185234190273235, longitude: 14.420227222144606}];
    emptyField.coordinate = [];
    addProps.field = fieldID ? FieldSelector.find(state)(fieldID) : emptyField;
    addProps.isUpdate = !!fieldID;
    addProps.fields = FieldSelector.findAll(state)();
    addProps.fields = addProps.fields.filter( field => field.id !== addProps.field.id) || [];
    addProps.allowEditPolygon = true;
    console.log("xxxxx addProps:", addProps, "state:", state, 'FieldID', fieldID);
    // addProps.field.coordinate = JSON.parse(addProps.field.coordinate);
    console.log("xxxxx addProps 1:", addProps, "state:", state, 'FieldID', fieldID);
    //for (const f of addProps.fields) { f.coordinate = JSON.parse(f.coordinate); }
    console.log("xxxxx addProps 2:", addProps, "state:", state, 'FieldID', fieldID);

    // addProps.field = JSON.parse(JSON.stringify(addProps.field));
    // addProps.fields = JSON.parse(JSON.stringify(addProps.fields));
    console.log('state map return:', addProps);
    console.log('state map fieldID:', fieldID);
    return addProps;
};

const mapDispatchToProps = (dispatch) => {
    return {
        insert_field: INSERT_FIELD_ACTION_REQ(dispatch),
        update_field: UPDATE_FIELD_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldFormComponent);
//export default FieldFormComponent;
