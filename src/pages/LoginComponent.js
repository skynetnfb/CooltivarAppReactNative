import React, {Component} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    BackHandler,
} from 'react-native';
import FirebaseAuth from '../utils/FirebaseAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR, STYLE} from '../styles/styles';
import ValidationFailMessage from '../components/common/ValidationFailMessage';


class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            status: '',
            user: false,
            loading: false,
        };

        this.loginSuccess = function() {
            this.setState({
                status: 'Login completed',
                loading: false,
                user:true,
            });
            this.props.navigation.replace('home', {user:true});
        }.bind(this);

        this.loginError = function(error) {
            this.setState({
                status: error.message,
                loading: false,
                user:false,
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

        this.register = function(text) {
            this.props.navigation.replace('register',{user:false});
        }.bind(this);

        this.doLogin = function() {
            this.setState({loading: true});
            let email=null;
            //email=this.state.email;
            email='b@b.it';
            //email='a@a.it';
            let password=null;
            password=this.state.password;
            password='123456';
            FirebaseAuth.signIn(email,password )
                .then(() => {
                    console.log('----------------------Success:');
                    this.loginSuccess();
                })
                .catch(error => {
                    console.log('----------------------Fail:');
                    this.loginError(error);
                });
            BackHandler.removeEventListener("hardwareBackPress", this.backAction);
            this.setState({loading: true});

        }.bind(this);

    }

    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to Quit Application?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        return (
            <SafeAreaView style={styles.main_container}>
                <View style={styles.app_name_container}>
                    <Icon
                        name={'md-leaf-sharp'}
                        size={60}
                        color={COLOR.MAIN}
                    />
                    <Text style={styles.app_name}>Cooltivar App</Text>
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
                <View style = {[styles.login_button_container]}>
                    <TouchableOpacity style={[STYLE.rowContainer, styles.login_button]} onPress={this.doLogin}>
                        <Text style={[styles.login_button_text, STYLE.centerRow]}>Login</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={[STYLE.rowContainer, styles.login_button]} onPress={this.register}>
                        <Text style={[styles.login_button_text, STYLE.centerRow]}>Register</Text>
                    </TouchableOpacity>
                </View>
                <View style={[STYLE.rowContainer]}>
                    {this.state.loading && (
                        <ActivityIndicator
                            size="large"
                            color={COLOR.MUTED}
                            style={[STYLE.centerRow]}
                        />
                    )}
                </View>

                <View style={styles.alert_box}>
                    {!!this.state.status && <ValidationFailMessage style={styles.alert_message}>{this.state.status}</ValidationFailMessage>}
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
        backgroundColor: COLOR.MAIN,
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
        backgroundColor: COLOR.MAIN,
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
        color: COLOR.MAIN,
    },
    alert_box: {
        marginTop: 10,
    },
    alert_message: {
        fontSize: 15,
        color: COLOR.DARK_ORANGE,
    },
});

export default LoginComponent;
