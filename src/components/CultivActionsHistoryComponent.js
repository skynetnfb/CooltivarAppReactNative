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
import Icon from 'react-native-vector-icons/Ionicons';


class  CultivActionsHistoryComponent extends Component{
    constructor() {
        super();
        this.goActionForm = function() {
            this.props.navigation.navigate('action form');
        }.bind(this);
    }
    render() {
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        console.log('------------cult HISTORY ROUTEPARAM2:',routeParams2);
        const {children} = this.props;
        return (
            <View style={styles.container}>
                <CultivActionCardComponent children={"Valore Card CultivActionHistoy"}></CultivActionCardComponent>
                <TouchableOpacity style={styles.footer}
                                  onPress={this.goActionForm}>
                    <Icon
                        name="md-add-circle-sharp"
                        size={40}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%', // maybe useless
        height: '90%',
    },
    footer: {
        backgroundColor: 'green',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        width: '100%', // maybe useless
    }
});



export default CultivActionsHistoryComponent;
