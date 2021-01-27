import React, {Component} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import {Text} from 'react-native';
import {STYLE, MAIN_COLOR} from '../../styles/styles';
import MapComponent from '../common/MapComponent';
import EditButton from '../common/EditButton';
import MapView from 'react-native-maps';
import {CultivationSelector} from '../../redux/selector/cultivation';
import {FIND_CULTIVATION_ACTION_REQ, INSERT_CULTIVATION_ACTION_REQ} from '../../redux/action/dispatchers/cultivation';
import {connect} from 'react-redux';
import {FIND_FIELD_ACTION_REQ} from '../../redux/action/dispatchers/field';
import {FieldSelector} from '../../redux/selector/field';
import Field from '../../model/Field';

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
        this.props.navigation.navigate('field_form', props);
    }

    render() {
        const param = this.params;
        const coordinates = []; //routeParams2 && routeParams2.coordinates || [];
        const mapStyle = [
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ];
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
                <MapView style={[styles.map]}
                         mapType={'hybrid'}
                         customMapStyle={mapStyle}
                         initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />

                <View style={[STYLE.rowContainer, STYLE.card, STYLE.fill, styles.card, {display: 'none'}]}>
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


const mapStateToProps = (state, props) => {
    let field = FieldSelector.find(state)(props.id || 1) || Field.getLoadingPlaceholder(); // todo: passa l'id vero in props.id;
    console.log('state map return:', field);
    return field;
};

const mapDispatchToProps = (dispatch) => {
    return {
        find_field_action: FIND_FIELD_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldDetailComponent);

// export default FieldDetailComponent;
