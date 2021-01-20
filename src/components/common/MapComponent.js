import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'react-native';
import {STYLE, MAIN_COLOR} from '../../styles/styles';

class MapComponent extends Component{
    render() {
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        // const navigationParams = this.props.navigation.getParam("params_object");
        return (
            <View style={[styles.container, STYLE.rowContainer]}>
                <Text style={[ STYLE.title, STYLE.fill ]}>{"This is the map"}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    marker: {
    },
    container:{
        minHeight: 200,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'gray',
    }
});

export default MapComponent;
