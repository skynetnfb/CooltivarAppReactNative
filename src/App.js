import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from "./navigator/RootNavigator";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from 'react-native'
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import firebase from 'firebase';

//const Realm = require('realm');
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = { realm: null };
    }

    componentDidMount() {

    }

        componentWillUnmount()
        {
            // Close the realm if there is one open.
            const {realm} = this.state;
            if (realm !== null && !realm.isClosed) {
                realm.close();
            }
        }


    render() {
        return (

            <Provider store={store}>
               <SafeAreaView style={{flex: 1}}>
                    <RootNavigator/>
               </SafeAreaView>
            </Provider>
            //<TitleComponent title = {"Titolo Login da App.js"}/>
            //                    <CultivationListComponent children = {"Children di Cultivation List"} />
                    //altre componment
               //<CultivationFormPage/>
            //<LoginComponent/>
            //<CultivationDetailComponent children = {"Children di Cultivation Detail solo per test"} />
            //<CultivationListComponent children = {"Children di Cultivation List"} />
                    // nomeComponent Parametri Props
                //</View>
        );
    }
}
export default App;


