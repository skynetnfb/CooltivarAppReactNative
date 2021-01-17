import React, {Component} from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,} from 'react-native';

import {CultivationCardComponent} from '../components';
import CultivActionCardComponent from "./CultivActionCardComponent";
class  CultivActionsHistoryComponent extends Component{
    render() {
        const {children} = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CultivActionCardComponent children={"Valore Card CultivActionHistoy"}></CultivActionCardComponent>
            </View>
        );
    }
}

export default CultivActionsHistoryComponent;
