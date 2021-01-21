import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from "./navigator/RootNavigator";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from 'react-native'
import {Provider} from 'react-redux';
import {store} from './redux/store/store';

//const Realm = require('realm');
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = { realm: null };
    }
    /*
    componentDidMount() {
        Realm.open({
            schema: [{name: 'Dog', properties: {name: 'string'}}]
        }).then(realm => {

            realm.write(() => {
                realm.create('Dog', {name: 'Rex'});
            });
            console.log('#########################SCHEMA DOG', realm.schema);
            this.setState({ realm });
        });
    }

    componentWillUnmount() {
        // Close the realm if there is one open.
        const {realm} = this.state;
        if (realm !== null && !realm.isClosed) {
            realm.close();
        }
    }*/

    render() {
        let timestamp = new Date().getTime();
        const info = this.state.realm
            ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog')
            : 'Loading...';
        //console.log('###############this.state.realm.objects',this.state.realm.objects('Dog'));
        return (

            <Provider store={store}>
               <SafeAreaView style={{
                   flex: 1
               }}>
                   <Text>{info}</Text>
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


