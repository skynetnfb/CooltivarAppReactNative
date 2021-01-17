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
//import FirebaseAuth from '../utils/FirebaseAuth';

class CultivationFormPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cultivar: '',
            description: '',
            status: '',
            validation:'validation message test',
            loading: false,
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
                name: text,
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

            /*
            this.setState({loading: true});
            FirebaseAuth.signIn(this.state.email, this.state.password)
                .then(() => {
                    this.loginSuccess();
                })
                .catch(error => {
                    this.loginError(error);
                });
        */

        }.bind(this);
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
                    <TouchableOpacity style={styles.confirm_button} onPress={this.login}>
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
