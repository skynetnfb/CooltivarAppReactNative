/**
 * @format
 */
import 'react-native-gesture-handler';
import React,{Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
//import App from './App';
import {name as appName} from './app.json';
import Provider from 'react-redux/lib/components/Provider';
import {PersistGate} from 'redux-persist/integration/react';
import {LoadingPage} from './src/pages/LoadingPage';
import createStore from './src/redux/store';

const {store, persistor} = createStore();

class Root extends Component {
    render() {
        console.log("----------------STORE", store);
        return (
            <Provider store={store}>
                    <App />
            </Provider>
        );
    }
}
// <Provider store={store}>
AppRegistry.registerComponent(appName, () => Root);
