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
import CameraComponent from "../components/CameraComponent";
import Cultivation from '../model/Cultivation';
import {
    createCultivation,
    createField,
    getAllCultivActions,
    getAllCultivations,
    getAllFields, getFieldById,
} from '../model/Repository';
import Field from '../model/Field';
import {any} from 'expect';
//import FirebaseAuth from '../utils/FirebaseAuth';

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
            realm: null,
            fields: any,
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

        this.handleChangeName = function(text) {
            this.setState({
                name: text
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



        this.confirm = function() {
            //this.state.cultivation = new Cultivation(this.state.name, this.state.cultivar, this.state.description, this.state.sowingDate, this.state.harvestDate, this.state.harvestWeight, this.state.status,null);
            //constructor(name, cultivar, description, field_id, sowingDate)
            //let cultivation = new Cultivation('this.state.name', 'this.state.cultivar', 'this.state.description', '1',new Date('2020-10-01'), new Date('2020-10-01'), '99', 'this.state.status',null);
            //let cultivation = new Cultivation('this.state.name', 'this.state.cultivar', 'this.state.description', 1, '01-01-2020','01-01-2020',100,'grow',null);
            let cultivation = new Cultivation('this.state.name', 'this.state.cultivar', 'this.state.description', 1,new ArrayBuffer(),new Date());
            console.log('---------------------- cultivation:',cultivation);
            //let temp;
            let field = new Field('name','description');
            console.log('-------------------------------------------- ID NEW Cultivation :',createCultivation(cultivation));
            console.log('-------------------------------------------- ID NEW FIELD :',createField(field));
            let temp = getAllFields();
            console.log('-------------------------------------------- temp = getAllFields(); :',temp);
            console.log('--------------------------------------------####### temp = getAllFields(); :',JSON.stringify(temp));
            console.log('--------------------------------------------####### temp = getAllFields(); :',JSON.stringify(temp));
            let cults = getAllCultivations();
            for(let cultivation of cults){
                console.log(cultivation.sowingDate.getTime());
            }
            for(let field of temp){
                console.log('----------------------FOR',field.id,field.name);
            }
            //console.log('-------------------------------------------- temp = getAllCultivation(); :',getAllCultivations());
            //console.log('-------------------------------------------- temp = getAllCultivation() LENGHT; :',getAllCultivations().length);
        }.bind(this);
    }

    componentDidMount() {
        let temp = getAllFields();
        console.log('--------------------------------------------componentDidMount() temp = getAllFields(); :',temp);
        console.log('--------------------------------------------componentDidMount() temp = getAllCultivation(); :',getAllCultivations());
        console.log('--------------------------------------------componentDidMount()  temp = getAllCultivation() LENGHT; :',getAllCultivations().length);
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={styles.scrollView}>
                <View style={styles.form_container}>
                    <TouchableOpacity onPress={this.openCamera} style={{width:300, height: 400,}}>
                        <CameraComponent/>
                    </TouchableOpacity>
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
                    <Picker selectedValue = {this.state.status} onValueChange = {this.handleChangeStatus}>
                        <Picker.Item label = "Seed" value = "seed" />
                        <Picker.Item label = "Grow" value = "grow" />
                        <Picker.Item label = "Flowering" value = "flowering" />
                        <Picker.Item label = "Completed" value = "completed" />
                    </Picker>
                    </View>
                    <View style={styles.input_text_container}>
                        <Picker selectedValue = {this.state.field} onValueChange = {this.handleChangeStatus}>
                            <Picker.Item label = "MOCKfield.name1" value = "MOCKfield.id1" />
                            <Picker.Item label = "MOCKfield.name2" value = "MOCKfield.id2" />
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

export default CultivationFormPage;
