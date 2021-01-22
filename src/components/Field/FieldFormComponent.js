import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet, View, Image, Button,
    SafeAreaView, TouchableHighlight,
} from 'react-native';
import {Text, TextInput} from 'react-native';
import {STYLE, MAIN_COLOR} from '../../styles/styles';
import MapComponent from '../common/MapComponent';
import EditButton from '../common/EditButton';
import ValidationFailMessage from '../common/ValidationFailMessage';
import ValidationComponent2 from './ValidationComponent2';
import {INSERT_FIELD_ACTION_REQ, UPDATE_FIELD_ACTION_REQ} from '../../redux/action/dispatchers/field';

class FieldFormComponent extends ValidationComponent2{
    constructor(props) {
        super(props);
        const route = this.props.route;
        const routeParams1 = route.params;
        // const route2 = routeParams1.route;
        // const routeParams2 = route2.params;
        this.params = routeParams1;

        let field = this.props.field; /*{
            name: "FieldName",
            city: "Agrigento",
            description: "desc dec des c sdgnsmdgms  oiasj pai ikwn lo asln ason q",
            coordinate: "11", // stringa unaria, così posso validarla con i validatori lunghezza per stringa.
        }*/

        field.coordinate = "1111";

        // field.description = "desc dec des c sdgnsmdgms  oiasj pai ikwn lo asln ason q";
        /*field = {
            name: "FieldName",
            city: "Agrigento",
            description: "desc dec des c sdgnsmdgms  oiasj pai ikwn lo asln ason q",
            coordinate: "11", // stringa unaria, così posso validarla con i validatori lunghezza per stringa.
        }*/

        const validationRules = {
            name: {minlength:3, maxlength:20, required: true, initialValue: field.name, errors:[]},
            city: {minlength:3, maxlength:20, required: true, initialValue: field.city, errors:[]},
            coordinate: {minlength:3, required: true, initialValue: field.coordinate, errors:[]},
            description: {maxlength: 200, initialValue: field.description, errors:[]},
        };
        this.setInitialValues(validationRules);
    }

    submit(){
        console.log('submitClicked()');
        this.doValidation();
        if (!this.isFormValid()) return;

        this.props.insert_field(this.getUpdatedFieldData());
        const data = {};
        // this.props.navigation.back(); // navigate('field', data);
    }

    getField() { return this.props.field; }

    getUpdatedFieldData() {
        const field = this.getField();
        field.name = this.state.name;
        field.city = this.state.city;
        field.description = this.state.description;
        field.coordinate = this.state.coordinate;
        return field; }

    render() {
        const param = this.params;
        const field = this.getField();
        return (
        <SafeAreaView style={[]}>
            <View style={[STYLE.title_background, styles.title_background]}>
                <Text style={[STYLE.title_text]}>{"Field create" + ", count:" + this.props.fields.length}</Text>
            </View>

            <View style={[STYLE.rowContainer, STYLE.fill, styles.root]}>
                <View style={[ STYLE.fill, styles.map, styles.border]}>
                    <View ref="map" coordinates={field.coordinates} />
                    {this.isFieldInError('coordinate') && this.getErrorsInField('coordinate').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }
                </View>

                <View style={[STYLE.rowContainer, STYLE.card, STYLE.fill, styles.card, styles.border]}>
                    <TextInput ref="name" multiline={true} onChangeText={(name) => this.onChange({name})}
                               style={[styles.input, styles.name, styles.border]}
                               value={this.state.name}  />
                    {this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

                    <TextInput ref="city" multiline={true} onChangeText={(city) => this.onChange({city})}
                               style={[styles.input, styles.city, styles.border]}
                               value={this.state.city}  />
                    {this.isFieldInError('city') && this.getErrorsInField('city').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

                    <View style={[STYLE.fill, STYLE.columnContainer, styles.input, styles.body, styles.border]}>
                        <TextInput ref="description" multiline={true} onChangeText={(description) => this.onChange({description})}
                                   style={[STYLE.centerColumn, styles.input]}
                                   value={this.state.description} />
                        {this.isFieldInError('description') && this.getErrorsInField('description').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }
                    </View>
                </View>
                <TouchableHighlight onPress={this.submit.bind(this)} style={ [ STYLE.submit, (this.isFormValid() ? STYLE.submitValid : STYLE.submitInvalid), styles.submit, styles.border ]}>
                    <Text style={[STYLE.centerColumn, STYLE.centerRow]}>Submit</Text>
                </TouchableHighlight>

                <View style={[{display: 'none'}]}>
                    <Text>DEBUG SECTION:</Text>
                    <Text>{ "\nroute:\n\n" + JSON.stringify(param, null, 4) }</Text>
                    <Text>{ "\nprops:\n\n" + JSON.stringify(this.props, null, 4) } }</Text>
                </View>
            </View>

        </SafeAreaView>);
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
        minHeight: 170,
        flexBasis: 0,
        // height: 300,
        flexGrow: 1,
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'gray',
    },
    title_background: {
        width: '100%',
        // marginBottom: 8,
    },
    input:{
    },
    border:{/*
        borderWidth: 2,
        borderColor: 'red',*/
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

const mapStateToProps = (state) => {
    let stateret = {};
    // noinspection TypeScriptValidateTypes
    stateret = {
        fields: state.fields,
        field: state.fields && (state.fields)[0],
        /*field: {
            id: state.content.id,
            name: state.content.name,
            city: state.content.city,
            coordinate: state.content.coordinate,
            description: state.content.description,
        }*/
    }

    // DAM: importante!
    stateret = JSON.parse(JSON.stringify(stateret)); // per assicurarmi di non modificare lo stato originale
    return stateret;

};

const mapDispatchToProps = (dispatch) => {
    return {
        insert_field: INSERT_FIELD_ACTION_REQ(dispatch),
        update_field: UPDATE_FIELD_ACTION_REQ(dispatch),
        // (field) => dispatch({type: "INSERT_FIELD", field: field}),
    };
}

// export default connect(mapStateToProps, FieldFormComponent);
export default connect(mapStateToProps, mapDispatchToProps)(FieldFormComponent);
//export default FieldFormComponent;
