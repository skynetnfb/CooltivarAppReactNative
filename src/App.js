import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from "./navigator/RootNavigator";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from 'react-native'


//const Realm = require('realm');
class  App extends React.Component{
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
        return (
               <SafeAreaView style={{flex: 1}}>
                    <RootNavigator/>
               </SafeAreaView>
        );
    }
}
export default App;


