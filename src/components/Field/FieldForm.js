import React  from 'react';
import {View, Text, TextInput, TouchableHighlight, StyleSheet} from 'react-native';
import ValidationComponent2 from './ValidationComponent2';
import ValidationFailMessage from '../common/ValidationFailMessage';
import {STYLE} from '../../styles/styles';

class FieldForm extends ValidationComponent2 {
    constructor(props) {
        super(props);

        const validationRules = {
            name: {minlength:3, maxlength:7, required: true, initialValue:"my Name", errors:[]},
            email: {email: true, initialValue:"ibtib@gmail.com", errors:[]},
            number: {numbers: true, initialValue:"64846", errors:[]},
            date: {date: 'YYYY-MM-DD', initialValue:"2017-03-01", errors:[]},
            newPassword: {initialValue:"", errors:[]},
            confirmPassword : {equalPassword : this.state.newPassword, initialValue:"", errors:[]}
        };
        this.setInitialValues(validationRules);
    }

    submit(){
        this.doValidation();
        if (!this.isFormValid()) return;
        const data = {};
        this.props.navigation.navigate("cultivation", data);
    }

    render() {
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        //<Text>{ "\nroute:\n\n" + JSON.stringify(routeParams2, null, 4) }</Text>
        const old =<><TextInput ref="name" onChangeText={(name) => this.onChange({name})} value={this.state.name} />
            {this.getErrorMessagesFor("name") && false && <ValidationFailMessage errors={this.getErrorMessagesFor("name")}/>}
            {this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

            <TextInput ref="email" onChangeText={(email) => this.onChange({email})} value={this.state.email} />
            {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

            <TextInput ref="number" onChangeText={(number) => this.onChange({number})} value={this.state.number} />
            {this.isFieldInError('number') && this.getErrorsInField('number').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

            <TextInput ref="date" onChangeText={(date) => this.onChange({date})} value={this.state.date} />
            {this.isFieldInError('date') && this.getErrorsInField('date').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

            <TextInput ref="newPassword" onChangeText={(newPassword) => this.onChange({newPassword})} value={this.state.newPassword} secureTextEntry={true}/>
            <TextInput ref="confirmPassword" onChangeText={(confirmPassword) => this.onChange({confirmPassword})} value={this.state.confirmPassword} secureTextEntry={true} />
            {this.isFieldInError('confirmPassword') && this.getErrorsInField('confirmPassword').map(errorMessage => <ValidationFailMessage>{errorMessage}</ValidationFailMessage>) }

            <TouchableHighlight onPress={this.submit.bind(this)} style={ [ STYLE.submit, (this.isFormValid() ? STYLE.submitValid : STYLE.submitInvalid) ]}>
                <Text>Submit</Text>
            </TouchableHighlight>
            <Text style={{display: 'none'}}>
                {this.getErrorMessages()}
            </Text></>;

        return (
            <View>
                <Text style={{display: 'none'}}>
                    TEST DEPRECATO
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    submit: {
        borderColor: 'blue',
        borderWidth: 4,
    },
    submitValid: {
        backgroundColor: '#00ff00',
    },
    submitInvalid: {
        backgroundColor: '#ff0000',
    }
});

export default FieldForm;
