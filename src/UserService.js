import React, {Component} from 'react';
import {connect} from 'react-redux';
import  firebase from 'firebase';
import {initRealm} from './model/Repository';
import{USER_LOGGED_REQ,USER_LOGGED_OUT_REQ} from './redux/action/dispatchers/UserAction';
import RootNavigator from './navigator/RootNavigator';
import {Alert, BackHandler} from 'react-native';

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

class UserService extends Component {
    constructor(props) {
        super(props);

        this.state={
            logged:null,
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
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
        console.log('####!!!!****-----------------------------CURRENT USER USERSERVICE',firebase.auth().currentUser);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let userDbPath;
                if(firebase.auth().currentUser!=null){
                    userDbPath = firebase.auth().currentUser.email;
                }
                initRealm(userDbPath);
                console.log('####-----------------------------DENTRO IF UTENTE LOGGATO',user);
                //this.props.user(user);
                this.props.userLoginAction(user);
                this.setState({logged:true});
                //this.props.route.navigation.navigate('home', {user:true});
            } else {
                console.log('####-----------------------------DENTRO ELSE UTENTE SLOGGATO',user);
                this.setState({logged:false});
                this.props.userLogoutAction();
            }
        });
    }

    render() {
        console.log('***####-----------------------------FINE USERSERVICE',);
        return (<RootNavigator logged={this.state.logged}/>)
    }
}
/*
const mapStateToProps = (state) => {
    let stateret;
    stateret = {
        userSelector:UserSelector.user(state),
        isLoggedSelector:UserSelector.isLogged(state),
    };
    return stateret;

};
*/
function mapDispatchToProps(dispatch) {
    return {
        userLoginAction:USER_LOGGED_REQ(dispatch),
        userLogoutAction:USER_LOGGED_OUT_REQ(dispatch)
    };
}

export default connect(null, mapDispatchToProps)(UserService);
