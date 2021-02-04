import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import UserService from './UserService';
import {LogBox} from 'react-native';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = { realm: null };
    }

    render() {
        return (
            <>
                <SafeAreaView style={{flex: 1}}>
                    <UserService/>
                </SafeAreaView>
            </>
        );
    }

    componentDidMount() {
        this.hideUselessWarnings();
    }

    hideUselessWarnings(){
        let W = 'Warning: ';
        W = '';
        const useless = [
            // W + 'Called stopObserving',

            // causato da navigation nested dentro route params, riempito da una libreria esterna e non risolvibile.
            W + 'Non-serializable values were found in the navigation state',
        ];

        LogBox.ignoreLogs(useless);
    }
}
export default App;


