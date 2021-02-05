import React, {Component} from 'react';
import {connect} from 'react-redux';
import  firebase from 'firebase';
import {initRealm} from './model/Repository';
import {USER_LOGGED_REQ, USER_LOGGED_OUT_REQ} from './redux/action/action_dispatchers';
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
            realm :null,
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
      firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let userDbPath;
                if(firebase.auth().currentUser!=null){
                    userDbPath = firebase.auth().currentUser.email;
                }
                let realm = initRealm(userDbPath);
                this.props.userLoginAction(user);
                this.setState({logged:true, realm:realm});
            } else {this.setState({logged:false});
                this.props.userLogoutAction();
            }
        });
    }

    componentWillUnmount()
    {
        const realm = this.state.realm;
        // Close the realm if there is one open.
        if (realm !== null && !realm.isClosed) {
            realm.close();
        }
    }

    render() {
        console.log('***####-----------------------------FINE USERSERVICE',);
        return (<RootNavigator logged={this.state.logged}/>)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLoginAction:USER_LOGGED_REQ(dispatch),
        userLogoutAction:USER_LOGGED_OUT_REQ(dispatch)
    };
}

export default connect(null, mapDispatchToProps)(UserService);
