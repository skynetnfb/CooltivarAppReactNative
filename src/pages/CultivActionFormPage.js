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
    Picker,
        } from 'react-native';
import {createCultivAction, updateCultivAction} from '../model/Repository';
import CultivAction from '../model/CultivAction';
import {DatePickerComponent} from '../components/DatePickerComponent';
import {STYLE} from '../styles/styles';

class CultivActionFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            description: '',
            status: '',
            type: '',
            validation:'validation message test',
            startDate:new Date("2021-01-01"),
            endDate: new Date("2021-01-01"),
            cultivation_id:-1,
            cultivAction: null,
        };
        console.log('###-------------------------------------------CONSTRUCTOR this.props.route.params.cultivAction ',this.props.route.params.cultivAction);
        if(this.props.route.params.cultivAction!==undefined){
            this.state.cultivAction= this.props.route.params.cultivAction;
            this.state.description = this.props.route.params.cultivAction.description;
            this.state.status = this.props.route.params.cultivAction.status;
            this.state.type = this.props.route.params.cultivAction.type;
            this.state.startDate = new Date(this.props.route.params.cultivAction.startDate).toDateString();
            this.state.endDate = new Date(this.props.route.params.cultivAction.endDate).toDateString();
        }


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

        /*
        this.onChangeStartDate = function (event, selectedDate) {
            const currentDate = selectedDate || this.state.startDate;
            console.log('---------------------------selected Date:',this.state.startDate);
            console.log('---------------------------this.startDate:',this.state.startDate);
            console.log('---------------------------current:',currentDate);
            this.setState({startDate:currentDate})
        }.bind(this);

        this.onChangeEndDate = function (event, selectedDate) {
            const currentDate = selectedDate || endDate;
            setShow(Platform.OS === 'ios');
            setEndDate(currentDate);
        }.bind(this);
        */


        this.confirm = function() {
            this.setState({loading: true});
            if(this.state.cultivAction==null){
                let cultivation_id = this.props.route.params.cultivation_id;
                this.state.cultivAction = new CultivAction(this.state.description,new Date(),new Date(), this.state.status,this.state.type, cultivation_id);
                createCultivAction(this.state.cultivAction);
            }else {
                let _cultivAction = new CultivAction();
                let cultivActionRealm = this.props.route.params.cultivAction;
                _cultivAction.id =cultivActionRealm.id;
                _cultivAction.description =this.state.description;
                _cultivAction.startDate=new Date(this.state.startDate);
                _cultivAction.endDate=new Date(this.state.endDate);
                _cultivAction.status=this.state.status;
                _cultivAction.type=this.state.type;
                _cultivAction.cultivation_id=cultivActionRealm.cultivation_id;
                updateCultivAction(_cultivAction);
            }
            console.log('###---------------------------------------------------GOBACK()')
            this.props.navigation.goBack();
        }.bind(this);

        this.resultStartDatePicker = function (date){
            this.setState({startDate:date});
        }.bind(this);

        this.resultEndDatePicker = function (date){
            this.setState({startDate:date});
        }.bind(this);
    }


    componentDidMount(){
    }
    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
    };



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

                        <View style = {[STYLE.columnContainer, {width: '100%'}]}>
                            <Text style={[STYLE.center]}>From</Text>
                            <DatePickerComponent initial_value ={this.state.startDate||new Date()} ref='startDateDP' result = {this.resultStartDatePicker}/>
                            <Text style={[STYLE.center]}>to</Text>
                            <DatePickerComponent initial_value ={this.state.endDate||new Date()} ref='startDateDP' result = {this.resultEndDatePicker}/>
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
        marginTop: 10,
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
