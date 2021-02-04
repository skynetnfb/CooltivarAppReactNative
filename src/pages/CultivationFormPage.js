import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Picker,
} from 'react-native';
import Cultivation from '../model/Cultivation';
import {DatePickerComponent} from '../components/abstract/DatePickerComponent';
import {STYLE} from '../styles';
import {CultivationSelector} from '../redux/selector';
import {
    INSERT_CULTIVATION_ACTION_REQ,
    UPDATE_CULTIVATION_ACTION_REQ,
} from '../redux/action/action_dispatchers';
import {connect} from 'react-redux';
import {FieldSelector} from '../redux/selector';
import ValidationComponent2 from '../components/Field/ValidationComponent2';
import ValidationFailMessage from '../components/common/ValidationFailMessage';


class CultivationFormPage extends ValidationComponent2 {
    constructor(props) {
        super(props);
        this.state = {
            cultivation: Cultivation,
            pristine: !this.props.isUpdate,
            /*
            name: '',
            cultivar: '',
            description: '',
            status: '',
            sowingDate:'',
            harvestDate:'',
            harvestweight:'',
            field_id:999,*/
            validation:'validation message test',
            loading: false,
            formStatus: '',
            realm: null,
            fields: null,
        };
        console.log('__fc constructor 2');
        const cultivation = this.props.cultivation || {};
        const validationRules = {
            name: {required:true, minlength:3, maxlength:20, initialValue: cultivation.name || '', errors:[]},
            cultivar: {required: true, minlength:2, maxlength:20, initialValue: cultivation.cultivar || '', errors:[]},
            description: {maxlength: 200, initialValue: cultivation.description || '', errors:[]},
            sowingDate: {required: true, initialValue: cultivation.sowingDate || new Date(), errors:[]},
            harvestDate: {required: true, initialValue: cultivation.harvestDate || new Date(new Date().getTime() + 2 * 30 * 24 * 60 * 60 * 1000), errors:[]},
            harvestWeight: {initialValue: cultivation.harvestWeight || 0, errors:[]},
            'dates cannot overlap': {required: true, initialValue: "1", errors:[]},
            status: {required: true, initialValue: cultivation.status || 'Seed', errors:[]},
            field_id: {required: true, initialValue: cultivation.field_id || this.props.fieldID || this.props.fields[0] && this.props.fields[0].id || '', errors:[]},
        };

        console.log('__cf constructor 3');
        this.setInitialValues(validationRules);

        this.formSuccess = function() {
            this.setState({
                formStatus: 'Cultivation Saved',
                loading: false,
            });
            this.props.navigation.pop();
        }.bind(this);

        this.handleChangeName = function(text) {
            console.log('------------------------------handleChangeName:',text);
            this.setState({
                name: text
            });
        }.bind(this);

        this.handleChangeDescription = function(text) {
            console.log('------------------------------handleChangeDescription:',text);
            this.setState({
                description: text,
            });
        }.bind(this);

        this.handleChangeCultivar = function(text) {
            console.log('------------------------------handleChangeCultivar:',text);
            this.setState({
                cultivar: text,
            });
        }.bind(this);

        this.handleChangeStatus = function(text) {
            console.log('------------------------------handleChangeStatus:',text);
            this.setState({
                status:text,
            });
        }.bind(this);

        this.handleChangeField = function(text) {
            console.log('------------------------------handleChangeFIELD:',text);
            this.setState({
                field_id:text,
            });
            this.onChange(null);
        }.bind(this);

        this.resultStartDatePicker = function (date){
            console.log('------------------------------resultStartDatePicker:',date)
            this.setState({dchange:"11", startDate:date, sowingDate: date, 'dates cannot overlap': this.checkDatesOverlap(date, null) ? "" : "1"});
            this.onChange({sowingDate: date});
            console.log('------------------------------STATE:',this.state.startDate)
        }.bind(this);

        this.resultEndDatePicker = function (date){
            this.setState({endDate:date, harvestDate: date, 'dates cannot overlap': this.checkDatesOverlap(null, date) ? "" : "1"});
            this.onChange({harvestDate: date});
            console.log('------------------------------End Date STATE:',this.state.endDate)
        }.bind(this);

        this.checkDatesOverlap = function(sowingDate: Date, harvestDate: Date): boolean {
            sowingDate = sowingDate || this.state.sowingDate;
            harvestDate = harvestDate || this.state.harvestDate;
            // se una data è non inizializzata considero non overlap = true per non sovrapporlo al messaggio "required"
            const ret = harvestDate && sowingDate && new Date(sowingDate).getTime() > new Date(harvestDate).getTime();
            console.log('-------------- check dates Overlap:', sowingDate, harvestDate, ret);
            return ret;
        }.bind(this);

        this.handleChangeHarvestWeight = function(text) {
            console.log('------------------------------handleChangeHarvestWeight:',text);
            this.setState({
                harvestweight:text,
            });
        }.bind(this);

        this.confirm = function() {
            this.doValidation();
            console.log('###------------------------------  SUBMIT PRESSED');
            if (!this.isFormValid()) return;

            let cultivation = this.props.cultivation || new Cultivation();
            this.setState({loading: true});
            cultivation.name = this.state.name;
            cultivation.cultivar = this.state.cultivar;
            cultivation.description = this.state.description;
            cultivation.sowingDate = new Date(this.state.sowingDate);
            cultivation.harvestDate = new Date(this.state.harvestDate);
            cultivation.harvestWeight = +this.state.harvestWeight || 0;
            cultivation.status = this.state.status;
            cultivation.preview = cultivation.preview || '';
            cultivation.field_id = this.state.field_id;
            console.log('###------------------------------  SUBMIT CULTIVATION :', cultivation);
            if (this.props.cultivation) this.props.update_cultivation(cultivation); else this.props.insert_cultivation(cultivation);
            this.formSuccess();

        }.bind(this);
    }

    componentDidMount() {
    }

    render() {
        let fields = this.props.fields;

        return (
            <View style={{flex: 1}}>
                <ScrollView style={[STYLE.fill, STYLE.rowContainer, {display: 'flex'}]} showsVerticalScrollIndicator ={false}
                            contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}} >
                    <View style={[STYLE.fill, {minHeight: '100%'}]}>
                        <View style={[styles.form_container, STYLE.rowContainer, STYLE.fill]}>
                            <View style={styles.input_text_container}>
                                <TextInput
                                    ref="name" multiline={false}
                                    style={styles.input_text}
                                    placeholder={'Name'}
                                    autoCapitalize={'none'}
                                    onChangeText={(name) => this.onChange({name})}
                                    value={this.state.name}
                                />
                            </View>
                            {this.isFieldInError('name') && <ValidationFailMessage>{this.getErrorsInField('name')[0]}</ValidationFailMessage>}

                            <View style={styles.input_text_container}>
                                <TextInput ref="cultivar" multiline={false}
                                           style={styles.input_text}
                                           placeholder={'Cultivar'}
                                           autoCapitalize={'none'}
                                           onChangeText={(cultivar) => this.onChange({cultivar})}
                                           value={this.state.cultivar}
                                />
                            </View>
                            {this.isFieldInError('cultivar') && <ValidationFailMessage>{this.getErrorsInField('cultivar')[0]}</ValidationFailMessage>}

                            <View style={styles.input_text_container}>
                                <TextInput ref="description"
                                           multiline={true}
                                           numberOfLines={4}
                                           style={styles.input_text_area}
                                           placeholder={'Description'}
                                           autoCapitalize={'none'}
                                           onChangeText={(description) => this.onChange({description})}
                                           value={this.state.description}
                                />
                            </View>
                            {this.isFieldInError('description') && <ValidationFailMessage>{this.getErrorsInField('description')[0]}</ValidationFailMessage>}

                            <View style={styles.input_text_container}>
                                <TextInput ref="harvestWeight"
                                           style={styles.input_text}
                                           placeholder={'Harvest Weight'}
                                           keyboardType={"numeric"}
                                           onChangeText={(harvestWeight) => this.onChange({harvestWeight})}
                                           value={this.state.harvestWeight}
                                />
                                {this.isFieldInError('harvestWeight') && <ValidationFailMessage>{this.getErrorsInField('harvestWeight')[0]}</ValidationFailMessage>}

                            </View>

                            <View style={styles.input_text_container}>
                                <Picker ref="status" selectedValue = {this.state.status} onValueChange = {(status) => this.onChange({status})}>
                                    <Picker.Item label = "Seed" value = "seed" />
                                    <Picker.Item label = "Grow" value = "grow" />
                                    <Picker.Item label = "Flowering" value = "flowering" />
                                    <Picker.Item label = "Completed" value = "completed" />
                                </Picker>
                                {this.isFieldInError('status') && <ValidationFailMessage>{this.getErrorsInField('status')[0]}</ValidationFailMessage>}
                            </View>

                            <View style={styles.input_text_container}>
                                <Picker ref="field_id" selectedValue = {this.state.field_id} onValueChange = {this.handleChangeField}>
                                    {fields.map( (element, index) => <Picker.Item key={element.id} label = {element.name} value = {element.id} />)}
                                </Picker>
                                {this.isFieldInError('field_id') && <ValidationFailMessage>{this.getErrorsInField('field_id')[0]}</ValidationFailMessage>}
                                <Text style={styles.debug_display}>{ "fieldid:" + this.state.field_id}</Text>
                            </View>

                            <View style = {[STYLE.columnContainer, {width: '100%'}]}>
                                <Text style={[STYLE.center]}>From</Text>
                                <DatePickerComponent initial_value ={this.state.sowingDate}  result = {this.resultStartDatePicker}/>

                                <Text style={[STYLE.center]}>to</Text>
                                <DatePickerComponent initial_value ={this.state.harvestDate}  result = {this.resultEndDatePicker}/>
                            </View>
                            {this.isFieldInError('sowingDate') && <ValidationFailMessage>{this.getErrorsInField('sowingDate')[0]}</ValidationFailMessage>}
                            {this.isFieldInError('harvestDate') && <ValidationFailMessage>{this.getErrorsInField('harvestDate')[0]}</ValidationFailMessage>}
                            <TextInput ref="dates cannot overlap"
                                       style={{display: 'none'}}
                                       placeholder={'DateOverlapValidation'}
                                       keyboardType={"numeric"}
                                       onChangeText={(dateOverlap) => this.onChange({"dates cannot overlap": dateOverlap})}
                                       value={this.state['dates cannot overlap']}
                            />
                            {this.isFieldInError('dates cannot overlap') && <ValidationFailMessage>{this.getErrorsInField('dates cannot overlap')[0]}</ValidationFailMessage>}

                            <Text style={styles.debug_display}>{ JSON.stringify({sow: new Date(this.state.sowingDate), har: new Date(this.state.harvestDate), overlap: this.state['dates cannot overlap'], })}</Text>
                        </View>

                        <View style={[styles.button_container]}>
                            <TouchableOpacity style={ [ STYLE.submit, (!this.state.pristine && this.isFormValid() ? STYLE.submitValid : STYLE.submitInvalid), styles.confirm_button]}
                                              onPress={this.confirm}>
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
                    </View>
                </ScrollView>
            </View>
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
    debug_display:{
        display: 'none',
    },
    form_container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: 'auto',
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
    date_picker_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
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
    const stateret = {};
    console.log('MapStateToProps, route:', props.route, 'route.params', props.route && props.route.params, 'route.params.id',  props.route && props.route.params && props.route.params.id);
    const cultivationID = props.route.params.id;
    stateret.cultivation = cultivationID ? CultivationSelector.find(state)(cultivationID):null;
    stateret.fields = cultivationID ? [FieldSelector.find(state)(stateret.cultivation.field_id)] : FieldSelector.findAll(state)();
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        insert_cultivation: INSERT_CULTIVATION_ACTION_REQ(dispatch),
        update_cultivation: UPDATE_CULTIVATION_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CultivationFormPage);
