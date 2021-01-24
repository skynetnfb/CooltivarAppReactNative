import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {userLogin, userLogout} from './actions';

const firebaseConfig = {
    apiKey: 'AIzaSyC_F98EhQTmgzbbalgnYqQFpCgOXcgcnxs',
    authDomain: '',
    databaseURL: '',
    projectId: 'reactcooltivarapp',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};

class BackgroundService extends Component {
    constructor(props) {
        super(props);
        /**
         * Firebase service initialization
         */
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        // Setup FirestoreDB
        /*let db = firebase.firestore();
        FirestoreDB.setDB(db);*/
    }

    componentDidMount() {
        // Login/logout handling listener
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.userLogin(user);
            } else {
                this.props.userLogout();
            }
        });
    }

    render() {
        return null;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLogin: function(user) {
            dispatch(userLogin(user));
        },
        userLogout: function() {
            dispatch(userLogout());
        },
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(BackgroundService);
