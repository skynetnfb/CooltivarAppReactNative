import React, {Component} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import {Text} from 'react-native';
import {STYLE, MAIN_COLOR, MAP_LABEL_STYLE} from '../../styles/styles';
import MapComponent from '../common/MapComponent';
import EditButton from '../common/EditButton';
import MapView from 'react-native-maps';
import {CultivationSelector} from '../../redux/selector/cultivation';
import {FIND_CULTIVATION_ACTION_REQ, INSERT_CULTIVATION_ACTION_REQ} from '../../redux/action/dispatchers/cultivation';
import {connect} from 'react-redux';
import {
    FIND_FIELD_ACTION_REQ,
    INSERT_FIELD_ACTION_REQ,
    UPDATE_FIELD_ACTION_REQ,
} from '../../redux/action/dispatchers/field';
import {FieldSelector} from '../../redux/selector/field';
import Field from '../../model/Field';
import FieldMap from './FieldMap';

class FieldDetailComponent extends FieldMap{
    constructor(props) {
        super(props);
    }

    editClicked() {
        console.log('editClicked');
        const field_id = this.props.id;
        this.props.navigation.navigate('field_form', {id: field_id});
    }

    render() {
        console.log('field detail props:', this.props);
        const field: Field = this.props.field;
        const fields: Field[] = this.props.fields;
        const coordinates = []; //routeParams2 && routeParams2.coordinates || [];
        const mapComponent = super.render();

        let ret =
            <View style={[STYLE.rowContainer, STYLE.fill, styles.root]}>
                <View style={[STYLE.title_background, styles.title_background]}>
                    <Text style={[STYLE.title_text]}>{"Field: " + field.name}</Text>
                    <EditButton style={[styles.edit_button]} onPress={this.editClicked.bind(this)}/>
                </View>
                {mapComponent}
                <View style={[STYLE.rowContainer, STYLE.card, STYLE.fill, styles.card]}>
                    <View style={[STYLE.columnContainer]}>
                        <Text style={[STYLE.centerColumn, STYLE.fill, styles.city]}>{"City: " + field.city}</Text>
                        <Image style={[STYLE.centerColumn, styles.meteo_image]} />
                    </View>
                    <View style={[STYLE.fill, STYLE.columnContainer, styles.body]}>
                        <Text style={[STYLE.centerColumn]}>{field.description}</Text>
                    </View>
                </View>
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
        color: MAIN_COLOR,
    },
    meteo_image: {
        backgroundColor: 'gray',
        height: 60,
        width: 60,
    },
    body: {
        // backgroundColor: 'red',
    },
    edit_button:{
        height: 60,
        width: 60,
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
    addProps.field = fieldID ? FieldSelector.find(state)(fieldID) : emptyField;

    console.log("xxxxx addProps.field:", addProps.field );
    addProps.isUpdate = !!fieldID;
    addProps.fields = FieldSelector.findAll(state)();
    addProps.fields = addProps.fields.filter( field => field.id !== addProps.field.id) || [];
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
    return addProps;
};

const mapDispatchToProps = (dispatch) => {
    return {
        find_field_action: FIND_FIELD_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, null)(FieldDetailComponent);

// export default FieldDetailComponent;
