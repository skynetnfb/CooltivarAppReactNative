import React, {Component}  from 'react';
import {View, Text, TextInput, TouchableHighlight} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import ValidationFailMessage from '../common/ValidationFailMessage';

class ValidationComponent2 extends ValidationComponent {
    validationRules = {};
    constructor(props) {
        super(props);
    }

    setInitialValues(validationRules) {
        console.log("validationRules:", validationRules);
        this.validationRules = validationRules;
        if (!this.state) this.state = {};
        console.log("validationRules:", this.validationRules);
        for (let key in this.validationRules) {
            this.state[key] = "" + this.validationRules[key].initialValue;
            this.validationRules[key].errors = [];
        }
    }

    doValidation() {
        // Call ValidationComponent validate method
        this.validate(this.validationRules);
        this.fillErrors();
        console.log("get errs v2:", this.getErrors());
    }

    onChange(keyVal) {
        this.setState(keyVal);
        setTimeout( () => this.doValidation(), 1);
    }

    fillErrors() {
        // empty array in the weird js way without actually replacing it
        for (let key in this.validationRules) { this.validationRules[key].errors.length = 0; }
        // fill current errors
        for (let err of this.errors) {
            console.log("Error loop:", err);
            const entry = this.validationRules[err.fieldName];
            if (!entry) continue;
            entry.errors.push(...err.messages);
        }
    }
    getErrors(){ return Object.values(this.validationRules).map( e => e.errors); }
    getErrorMessagesFor(inputname, caseSensitive = false) {
        return this.validationRules[inputname].errors;
        /*if (!caseSensitive) inputname = inputname.toLowerCase();
        const ret = [];
        for (let err of this.errors) {
            console.log("Error loop:", err);
            if ( (caseSensitive ? err.fieldName : err.fieldName.toLowerCase()) === inputname) ret.push(...err.messages);
        }
        return ret;*/
    }

    render() { return ( <Text>ValidationComponent2: You have to override the render method</Text> ); }

}
export default ValidationComponent2;
