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
    Picker,
} from 'react-native';
import Cultivation from '../model/Cultivation';
import {DatePickerComponent} from '../components/DatePickerComponent';
import {
    createCultivation, updateCultivation,
} from '../model/Repository';
import {STYLE} from '../styles/styles';
import {CultivationSelector} from '../redux/selector/cultivation';
import {
    INSERT_CULTIVATION_ACTION_REQ,
    UPDATE_CULTIVATION_ACTION_REQ,
} from '../redux/action/dispatchers/cultivation';
import {connect} from 'react-redux';
import Field from '../model/Field';


class CultivationFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cultivation: Cultivation,
            name: '',
            cultivar: '',
            description: '',
            status: '',
            sowingDate:'',
            harvestDate:'',
            harvestweight:'',
            field_id:999,
            validation:'validation message test',
            loading: false,
            formStatus: '',
            realm: null,
            fields: null,
        };

        if(this.props.cultivation!=null){
            console.log('###------------------------------ DENTRO IF cultivation',this.props.cultivation);
            this.state.name = this.props.cultivation.name;
            this.state.cultivar = this.props.cultivation.cultivar;
            this.state.description = this.props.cultivation.description;
            this.state.sowingDate = this.props.cultivation.sowingDate.toString();
            this.state.harvestDate = this.props.cultivation.harvestDate.toString();
            this.state.harvestWeight = this.props.cultivation.harvestWeight.toString();
            this.state.status = this.props.cultivation.status;
            this.state.field_id = this.props.cultivation.field_id;
        }

        this.formSuccess = function() {
            this.setState({
                formStatus: 'Cultivation Saved',
                loading: false,
            });
            this.props.navigation.goBack();
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
        }.bind(this);

        this.resultStartDatePicker = function (date){
            this.setState({startDate:date});
            console.log('------------------------------STATE:',this.state.startDate)
        }.bind(this);

        this.resultEndDatePicker = function (date){

            this.setState({
                endDate:date
            });
            console.log('------------------------------End Date STATE:',this.state.endDate)
        }.bind(this);

        this.handleChangeHarvestWeight = function(text) {
            console.log('------------------------------handleChangeHarvestWeight:',text);
            this.setState({
                harvestweight:text,
            });
        }.bind(this);

        this.confirm = function() {
            if(this.props.cultivation==null){
                console.log('###------------------------------  DENTRO IF  :');
                this.setState({loading: true});
                let cultivation = new Cultivation(this.state.name, this.state.cultivar, this.state.description, '1',this.state.startDate,this.state.endDate,1,this.state.status, '');
                this.props.insert_cultivation(cultivation);
                //TODO COLLEGAMENTO DINAMICO DEI FIELD NELLA SELECT
                this.formSuccess();
            }else{
                let _cultivation = new Cultivation();
                _cultivation.id = this.props.cultivation.id;
                _cultivation.name = this.state.name;
                _cultivation.cultivar = this.state.cultivar;
                _cultivation.description = this.state.description;
                _cultivation.sowingDate = new Date(this.state.sowingDate);
                _cultivation.harvestDate = new Date(this.state.harvestDate);
                _cultivation.harvestWeight = this.state.harvestWeight;
                _cultivation.status = this.state.status;
                _cultivation.preview = this.props.cultivation.preview;
                _cultivation.field_id = this.state.field_id;
                console.log('###------------------------------  DENTRO ELSE _CULTIVATION :',_cultivation);
                //updateCultivation(_cultivation);
                this.props.update_cultivation(_cultivation);
                this.formSuccess();
            }
        }.bind(this);
    }

    componentDidMount() {

    }

    render() {
        let fields = [
            new Field('field_1', 'Agrigento', 'primo agr test'),
            new Field('field_2', 'Frosinone', 'fros desc test'),
            new Field('field_3', 'Termini', 'term desc test'),
            new Field('field_4', 'Terni', 'tern desc test'),
        ];
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator ={false}>
                <View style={styles.form_container}>
                    <View style={styles.input_text_container}>
                        <TextInput
                            style={styles.input_text}
                            placeholder={'Name'}
                            autoCapitalize={'none'}
                            onChangeText={this.handleChangeName}
                            value={this.state.name}
                        />
                    </View>

                    <View style={styles.input_text_container}>
                        <TextInput
                            style={styles.input_text}
                            placeholder={'Cultivar'}
                            autoCapitalize={'none'}
                            onChangeText={this.handleChangeCultivar}
                            value={this.state.cultivar}
                        />
                    </View>

                    <View style={styles.input_text_container}>
                        <TextInput
                            style={styles.input_text_area}
                            placeholder={'Description'}
                            autoCapitalize={'none'}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={this.handleChangeDescription}
                            value={this.state.description}
                        />
                    </View>

                    <View style={styles.input_text_container}>
                        <TextInput
                            style={styles.input_text}
                            placeholder={'Harvest Weight'}
                            autoCapitalize={'none'}
                            onChangeText={this.handleChangeHarvestWeight}
                            value={this.state.harvestWeight}
                        />
                    </View>

                    <View style={styles.input_text_container}>
                    <Picker selectedValue = {this.state.status} onValueChange = {this.handleChangeStatus}>
                        <Picker.Item label = "Seed" value = "seed" />
                        <Picker.Item label = "Grow" value = "grow" />
                        <Picker.Item label = "Flowering" value = "flowering" />
                        <Picker.Item label = "Completed" value = "completed" />
                    </Picker>
                    </View>

                    <View style={styles.input_text_container}>
                        <Picker selectedValue = {this.state.field} onValueChange = {this.handleChangeField}>
                            {fields.map( (element, index) => <Picker.Item key= {index} label = {element.name} value = {element.id} />)}
                        </Picker>
                    </View>

                    <View style = {[STYLE.columnContainer, {width: '100%'}]}>
                        <Text style={[STYLE.center]}>From</Text>
                        <DatePickerComponent initial_value ={this.state.sowingDate||new Date()}  result = {this.resultStartDatePicker}/>
                        <Text style={[STYLE.center]}>to</Text>
                        <DatePickerComponent  initial_value ={this.state.harvestDate||new Date()}  result = {this.resultEndDatePicker}/>
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
        cultivation:props.route.params.id? CultivationSelector.find(state)(props.route.params.id):null,
        selectors: CultivationSelector,
    };
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        insert_cultivation: INSERT_CULTIVATION_ACTION_REQ(dispatch),
        update_cultivation: UPDATE_CULTIVATION_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CultivationFormPage);
