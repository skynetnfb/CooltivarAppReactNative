/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import Provider from 'react-redux/lib/components/Provider';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingPage from './src/pages/LoadingPage';
import {store, persistor} from './src/redux/store';


class Root extends Component {
    state = {
        gateLifted: false
    };

    onBeforeLift = () => {
        // Take an action before the gate lifts
        setTimeout(() => {
            this.setState({ gateLifted: true})
        }, 3000);
    };

    render() {
        console.log("----------------STORE", store, persistor);
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={<LoadingPage/>} onBeforeLift={this.onBeforeLift}>
                    { this.state.gateLifted ? <App /> : <LoadingPage/>}

                </PersistGate>
            </Provider>
        );
    }
}
// <Provider store={store}>
AppRegistry.registerComponent(appName, () => Root);
