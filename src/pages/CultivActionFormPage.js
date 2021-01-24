import React, {Component, useState} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Picker, Button, Platform,
} from 'react-native';
import {createCultivAction} from '../model/Repository';
import CultivAction from '../model/CultivAction';
import {DatePickerComponent} from '../components/DatePickerComponent';
import DateTimePicker from '@react-native-community/datetimepicker';

class CultivActionFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            description: '',
            status: '',
            type: '',
            validation:'validation message test',
            //startDate:useState(new Date("2021-01-01")),
            //endDate: useState(new Date("2021-01-01")),
            startDate:new Date("2021-01-01"),
            endDate: new Date("2021-01-01"),
            cultivation_id:-1,
            cultivAction: null,
        };



        this.formSuccess = function() {
            this.setState({
                status: 'Cultivation Saved',
                loading: false,
            });
            this.props.navigation.goBack();
        }.bind(this);

        this.loginError = function(error) {
            this.setState({
                status: 'Cultivation Save Error',
                loading: false,
            });
        }.bind(this);


        this.handleChangeDescription = function(text) {
            this.setState({
                description: text,
            });
        }.bind(this);

        this.handleChangeCultivar = function(text) {
            this.setState({
                cultivar: text,
            });
        }.bind(this);

        this.handleChangeStatus = function(text) {
            this.setState({
                status: text,
            });
        }.bind(this);

        this.handleChangeType = function(text) {
            this.setState({
                type: text,
            });
        }.bind(this);

        this.onChangeStartDate = function (event, selectedDate) {
            const currentDate = selectedDate || this.state.startDate;
            console.log('---------------------------selected Date:',this.state.startDate);
            console.log('---------------------------this.startDate:',this.state.startDate);
            console.log('---------------------------current:',currentDate);
            this.setState({startDate:currentDate})
        }.bind(this);

        /*
        this.onChangeEndDate = function (event, selectedDate) {
            const currentDate = selectedDate || endDate;
            setShow(Platform.OS === 'ios');
            setEndDate(currentDate);
        }.bind(this);
        */


        this.confirm = function() {
            this.setState({loading: true});
            //CULTIVA_ACTION constructor( description,startDate,endDate, status, type,cultivation_id)
            let cultivAction = new CultivAction('Descrizione test',new Date(),new Date(), 'STATUS mock','TYPE mock', '35416841568971864');
            createCultivAction(cultivAction);
            //TODO come gestiamo il redirect? nadiamo back o andiamo avanti ricaricando i dati?
            //this.props.navigation.goBack();
        }.bind(this);


        this.resultStartDatePicker = function (date){
            this.setState({startDate:date});
            console.log('------------------------------DATE:',date);
            console.log('------------------------------STATE:',this.state.startDate)
        }.bind(this);

        this.resultEndDatePicker = function (date){
            this.setState({startDate:date});
            console.log('------------------------------End DATE:',date);
            console.log('------------------------------End Date STATE:',this.state.endDate)
        }.bind(this);
    }



    render() {
        return (
            <SafeAreaView style = {{flex: 1}}>
                <ScrollView style = {styles.scrollView} showsVerticalScrollIndicator ={false}>
                    <View style = {styles.form_container}>
                        <View style = {styles.input_text_container}>
                            <TextInput
                                style = {styles.input_text_area}
                                placeholder = {'Description'}
                                autoCapitalize = {'none'}
                                multiline = {true}
                                numberOfLines = {4}
                                onChangeText = {this.handleChangeDescription}
                                value = {this.state.description}
                            />
                        </View>

                        <View style = {styles.input_text_container}>
                            <TextInput
                                style = {styles.input_text_area}
                                placeholder = {'Date'}
                                onChangeText = {this.handleChangeDescription}
                                value = {this.state.description}
                            />
                        </View>

                        <DatePickerComponent ref='startDateDP' result = {this.resultStartDatePicker}/>
                        <DatePickerComponent ref='startDateDP' result = {this.resultEndDatePicker}/>

                        <View style={styles.input_text_container}>
                            <Picker selectedValue = {this.state.type} onValueChange = {this.handleChangeType}>
                                <Picker.Item label = "Threat" value = "Threat" />
                                <Picker.Item label = "Remedy" value = "Remedy" />
                                <Picker.Item label = "Custom" value = "Custom" />
                                <Picker.Item label = "Irrigation" value = "Irrigation" />
                            </Picker>
                        </View>
                        <View style={styles.input_text_container}>
                            <Picker selectedValue = {this.state.status} onValueChange = {this.handleChangeStatus}>
                                <Picker.Item label = "Todo" value = "Todo" />
                                <Picker.Item label = "Progress" value = "Progress" />
                                <Picker.Item label = "Completed" value = "Completed" />
                                <Picker.Item label = "Fail" value = "Fail" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.button_container}>
                        <TouchableOpacity style={styles.confirm_button} onPress={this.confirm}>
                            <Text style={styles.confirm_button_text}>Confirm</Text>
                            {this.state.loading && (
                                <ActivityIndicator
                                    size="small"
                                    color="#fff"
                                    style={styles.login_button_ai}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.alert_box}>
                        <Text style={styles.alert_message}>{this.state.validation}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        width:'100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    form_container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    input_text_container: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 2,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
    },
    input_text: {
        padding: 6,
        fontSize: 14,
    },

    input_text_area: {
        padding: 6,
        fontSize: 14,
        alignItems: 'flex-start',
        justifyContent: "flex-start",
    },

    button_container: {
        paddingVertical: 2,
        paddingHorizontal: 100,
    },
    confirm_button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirm_button_text: {
        fontSize: 20,
        color: '#fff',
    },
    login_button_ai: {
        marginLeft: 10,
    },
    alert_box: {
        marginTop: 10,
    },
    alert_message: {
        fontSize: 15,
        color: '#ff1744',
    },
});

export default CultivActionFormPage;
