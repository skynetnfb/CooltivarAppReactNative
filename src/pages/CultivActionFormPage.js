import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import CultivAction from '../model/CultivAction';
import {DatePickerComponent} from '../components/abstract/DatePickerComponent';
import {STYLE} from '../styles';
import {CultivationSelector} from '../redux/selector';
import {connect} from 'react-redux';
import {
    INSERT_OPERATION_ACTION_REQ,
    UPDATE_OPERATION_ACTION_REQ,
} from '../redux/action/action_dispatchers';
import {CultivActionSelector} from '../redux/selector';
import {createScheduledNotification,createNotificationChannel,configureNotification} from '../utils';
import {Picker} from '@react-native-community/picker';

configureNotification();
createNotificationChannel();

class CultivActionFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            description: 'Description',
            status: 'Todo',
            type: 'Custom',
            validation:'validation message test',
            startDate:new Date(),
            endDate: new Date(),
            cultivation_id:-1,
        };
        if(this.props.route.params.cultivAction!==undefined){
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

        this.confirm = function() {
            this.setState({loading: true});
            if(this.props.route.params.cultivAction==null){
                let cultivation_id = this.props.route.params.cultivation_id;
                let _cultivAction = new CultivAction(
                    this.state.description,
                    new Date(this.state.startDate),
                    new Date(this.state.endDate),
                    this.state.status,
                    this.state.type,
                    cultivation_id
                );
                this.props.insert_cultivAction(_cultivAction);

                createScheduledNotification(
                    "Cooltivar App Notification",
                    "Action Required: "+this.state.type+" - "+this.state.status+" - "+this.state.description,
                    new Date(this.state.startDate)
                );

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
                this.props.update_cultivAction(_cultivAction);

                createScheduledNotification(
                    "Cooltivar App Notification",
                    _cultivAction.type+" : "+_cultivAction.status+" : "+this.state.description,
                    new Date(this.state.startDate)
                );


            }

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
                            <DatePickerComponent initial_value ={this.state.startDate||new Date()}  result = {this.resultStartDatePicker}/>
                            <Text style={[STYLE.center]}>to</Text>
                            <DatePickerComponent initial_value ={this.state.endDate||new Date()}  result = {this.resultEndDatePicker}/>
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
                        <Text style={styles.alert_message}></Text>
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

const mapStateToProps = (state,props) => {
    let stateret;
    stateret = {
        cultivAction:props.route.params.id? CultivationSelector.find(state)(props.route.params.id):null,
        selectors: CultivActionSelector,
    };
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        insert_cultivAction: INSERT_OPERATION_ACTION_REQ(dispatch),
        update_cultivAction: UPDATE_OPERATION_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CultivActionFormPage);
