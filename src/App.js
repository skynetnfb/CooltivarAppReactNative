import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Provider} from 'react-redux';
import {store} from './redux/store/store';
import UserService from './UserService';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = { realm: null };
    }

    componentDidMount() {
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
}
export default App;


