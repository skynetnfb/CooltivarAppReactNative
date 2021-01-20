import React, {Component} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import {Text} from 'react-native';
import {STYLE, MAIN_COLOR} from '../../styles/styles';
import MapComponent from '../common/MapComponent';
import EditButton from '../common/EditButton';

class FieldDetailComponent extends Component{
    constructor(props) {
        super(props);
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        this.params = routeParams2;
    }

    editClicked() {
        console.log('editClicked');
        const props = this.params;
        this.props.navigation.navigate('field-form', props);
    }

    render() {
        const param = this.params;
        const coordinates = []; //routeParams2 && routeParams2.coordinates || [];
        // const navigationParams = this.props.navigation.getParam("params_object");
        let debugFlex =
            <View style={[STYLE.columnContainer, STYLE.fill, styles.root]}>
                <View style={[STYLE.centerColumn, {backgroundColor: 'red'}]}><Text>RED</Text></View>
                <View style={[STYLE.centerColumn, {backgroundColor: 'green'}]}><Text>GREEN</Text></View>
                <View style={[STYLE.centerColumn, STYLE.fill, {backgroundColor: 'blue'}]}><Text>BLUE</Text></View>
            </View>;

        let ret =
            <View style={[STYLE.rowContainer, STYLE.fill, styles.root]}>
                <View style={[STYLE.title_background, styles.title_background]}>
                    <Text style={[STYLE.title_text]}>{"Field: " + param.title}</Text>
                    <EditButton style={[styles.edit_button]} onPress={this.editClicked.bind(this)}/>
                </View>
                <View style={[styles.map]} coordinates={coordinates} />

                <View style={[STYLE.rowContainer, STYLE.card, STYLE.fill, styles.card]}>
                    <View style={[STYLE.columnContainer]}>
                        <Text style={[STYLE.centerColumn, STYLE.fill, styles.city]}>{"City: " + param.subtitle}</Text>
                        <Image style={[STYLE.centerColumn, styles.meteo_image]} />
                    </View>
                    <View style={[STYLE.fill, STYLE.columnContainer, styles.body]}>
                        <Text style={[STYLE.center]}>{param.body}</Text>
                    </View>
                </View>
                <View style={{display: 'none'}}>
                    <Text>DEBUG SECTION:</Text>
                    <Text>{ "\nroute:\n\n" + JSON.stringify(param, null, 4) }</Text>
                    <Text>{ "\nprops:\n\n" + JSON.stringify(this.props, null, 4) } }</Text>
                </View>
            </View>;
        return ret;
    }
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
    },
    card: {/*
        backgroundColor: 'gray',
        borderWidth: 5,
        borderColor: 'black',*/
    },
    map: {
        height: 200,
        backgroundColor: 'white',
        borderWidth: 5,
        borderColor: 'gray',
    },
    title_background: {
        // marginBottom: 8,
    },
    city: {
        fontSize: 20,
        color: MAIN_COLOR,
    },
    meteo_image: {
        backgroundColor: 'gray',
        height: 60,
        width: 60,
    },
    body: {
        // backgroundColor: 'red',
    },
    edit_button:{
        height: 60,
        width: 60,
    },
});

export default FieldDetailComponent;
