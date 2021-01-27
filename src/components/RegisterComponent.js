import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import FirebaseAuth from '../utils/FirebaseAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import RootNavigator from '../navigator/RootNavigator';



class RegisterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            status: '',
            user: null,
            loading: false,
        };


        this.registerSuccess = function() {
            this.setState({
                status: 'Registration Complete',
                loading: false,
                user:true,
            });
            this.props.navigation.navigate('home',{user:true});
        }.bind(this);

        this.registerError = function(error) {
            console.log('ERROR REGISTER MESSAGE: ',error.message);
            this.setState({
                status: error.message,
                loading: false,
            });
        }.bind(this);

        this.handleChangeEmail = function(text) {
            this.setState({
                email: text,
            });
        }.bind(this);

        this.handleChangePassword = function(text) {
            this.setState({
                password: text,
            });
        }.bind(this);

        this.doRegister = function() {
            this.setState({loading: true});
            FirebaseAuth.signUp(this.state.email, this.state.password)
                .then(() => {
                    this.registerSuccess();
                })
                .catch(error => {
                    this.registerError(error);
                });
        }.bind(this);


    this.login = function(text) {
        //console.log('----------------------INSIDE REGISTER PROPS',this.props);
        this.props.navigation.navigate('login');
    }.bind(this);


    }

    render() {

        const firebaseConfig = {
            apiKey: 'AIzaSyC_F98EhQTmgzbbalgnYqQFpCgOXcgcnxs',
            authDomain: 'reactcooltivarapp.firebaseapp.com',
            databaseURL: '',
            projectId: 'reactcooltivarapp',
            storageBucket: 'reactcooltivarapp.appspot.com',
            messagingSenderId: '461253967081',
            appId: '1:461253967081:web:6c21b324129a2319960478',
            measurementId: '',
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.app_name_container}>
                    <Icon
                          name={'md-leaf-sharp'}
                          size={60}
                          color={'green'}
                    />
                    <Text style={styles.app_name}>Register to Cooltivar </Text>
                </View>
                <View style={styles.login_box}>
                    <View style={styles.login_email_container}>
                        <TextInput
                            style={styles.login_email}
                            placeholder={'Email'}
                            autoCapitalize={'none'}
                            onChangeText={this.handleChangeEmail}
                            value={this.state.email}
                        />
                    </View>
                    <View style={styles.login_password_container}>
                        <TextInput
                            style={styles.login_password}
                            placeholder={'Password'}
                            autoCapitalize={'none'}
                            onChangeText={this.handleChangePassword}
                            value={this.state.password}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View style={styles.login_button_container}>
                    <TouchableOpacity style={styles.login_button} onPress={this.doRegister}>
                        <Text style={styles.login_button_text}>Register</Text>
                        {this.state.loading && (
                            <ActivityIndicator
                                size="small"
                                color="#fff"
                                style={styles.login_button_ai}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.login_button} onPress={this.login}>
                        <Text style={styles.login_button_text}>Back</Text>
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
                    <Text style={styles.alert_message}>{this.state.status}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    app_name_container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    login_box: {
        backgroundColor: 'green',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    login_email_container: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    login_email: {
        fontSize: 15,
    },
    login_password_container: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        borderRadius: 5,
    },
    login_password: {
        fontSize: 15,
    },
    login_button_container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    login_button: {
        backgroundColor: 'green',
        paddingVertical: 8,
        margin: 8,
        borderRadius: 5,
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign:'center',
    },
    login_button_text: {
        fontSize: 20,
        color: '#fff',
    },
    app_name: {
        fontSize: 32,
        color: 'green',
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

export default RegisterComponent;
