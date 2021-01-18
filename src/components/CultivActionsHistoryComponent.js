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

import CultivActionCardComponent from "./CultivActionCardComponent";


class  CultivActionsHistoryComponent extends Component{
    constructor() {
        super();

        this.goActionForm = function() {
            this.props.navigation.navigate('action form');
        }.bind(this);
    }
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
                <TouchableOpacity style={styles.footer}
                                  onPress={this.goActionForm}>
                    <Text>
                        "button"
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'green',
        padding: 10,
        flexDirection: 'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        width: '100%', // maybe useless
    }
});



export default CultivActionsHistoryComponent;
