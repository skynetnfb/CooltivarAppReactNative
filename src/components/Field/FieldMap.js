import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    StyleSheet, View, Image, Button, LogBox,
    SafeAreaView, TouchableHighlight, TouchableOpacity
} from 'react-native';
import {Text, TextInput} from 'react-native';
import {STYLE, MAIN_COLOR, MAP_LABEL_STYLE, COLOR} from '../../styles/styles';
import MapComponent from '../common/MapComponent';
import EditButton from '../common/EditButton';
import ValidationFailMessage from '../common/ValidationFailMessage';
import ValidationComponent2 from './ValidationComponent2';
import Geolocation, {
    GeolocationError,
    GeolocationOptions,
    GeolocationResponse,
} from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';



import {
    FIND_FIELD_ACTION_REQ,
    INSERT_FIELD_ACTION_REQ,
    UPDATE_FIELD_ACTION_REQ,
} from '../../redux/action/dispatchers/FieldAction';
import Icon from 'react-native-vector-icons/Ionicons';
import {FieldSelector} from '../../redux/selector/FieldSelector';
import Field from '../../model/Field';
import MapView, {Polygon, Marker} from 'react-native-maps';
import {BoundaryHelper} from '../../utils/CoordUtils';
import RNFetchBlob from 'react-native-fetch-blob';

class FieldMap extends ValidationComponent2{
    markers = [];

    constructor(props) {
        super(props);
        this.state = {
            onMapAndLayoutReadyCalled: false,
            showUserLocation: true,
            mapType: 'hybrid',
            geolocalization: false,
            userLocation: null,
            gotFirstLocationUpdate: false,
            layoutReady: false,
            mapReady: false,
            geolocationWatcherID: [],
            permissionGranted: false,
            mapSnapshot: null,
            coordinate: this.getField().coordinate,
        }
        console.log('__fm constructor end');
    }

    requestLocationPermission = async function(callFollow = false) {
        console.log('__fm permission requestLocationPermission?', this.state.permissionGranted);
        if (this.state.permissionGranted) return;
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("__fm permission granted");
                this.setState({permissionGranted: true});
                if (callFollow) setTimeout( () => this.followUser(true), 1000);
                // this.animateCamera2();
            } else {
                console.log("__fm permission refused");
            }
        } catch (err) {
            console.warn("__fm permission error", err);
        }
    }.bind(this);

    getField = function(): Field { return this.props.field; }.bind(this);

    getMutedFields = function() {
        return this.props.fields;
    }.bind(this);

    getUpdatedFieldData = function(useFirstSnapshot: boolean = true): Field {
        const field: Field = {...this.getField() };
        field.name = this.state.name;
        field.city = this.state.city;
        field.description = this.state.description;
        field.coordinate = JSON.stringify(this.getCoordinate());
        field.image = useFirstSnapshot ? this.state.mapSnapshot : this.state.screenfilepath || null;
        return field; }.bind(this);

    takeSnapshot = function() {
        const snapshot = this.getMap().takeSnapshot({
            width: 300,      // optional, when omitted the view-width is used
            height: 300,     // optional, when omitted the view-height is used
            format: 'jpg',   // image formats: 'png', 'jpg' (default: 'png')
            quality: 0.8,    // image quality: 0..1 (only relevant for jpg, default: 1)
            result: 'file'   // result types: 'file', 'base64' (default: 'file')
        });
        snapshot.then((uri) => {
            console.log('gotSnapshot(', uri, ')');
            this.setState({ mapSnapshot: uri });
            this.finalizeSubmit(true, false);
        });

    }.bind(this);
/*
    savePicture = function (base64Data: string) {
        const field = this.getField();
        const path = RNFetchBlob.fs.dirs.DocumentDir + "_field_ " + field.id + new Date().getTime();
        RNFetchBlob.fs.writeFile(path, base64Data, 'base64')
            .then(() => {
                console.log('FILE WRITTEN!');
                console.log('##--------------------------------------------------------FILE WRITTEN on PATH!', path );
                this.setState({screenfilepath: 'file://'+path});
            }).catch((err) => {
            console.log('##--------------------------------------------------------Catch ERROR!!!!!',err);
            console.log(err.message);
            this.finalizeSubmit(false, false);
        });
    }.bind(this);
*/
    markerOnDrag = function(syntethicEvent, index) {
        // overriden
    }.bind(this);

    onPress = function(syntethicEvent) {
        // overriden
    }.bind(this);

    onDoublePress = function(coordinate/*: LatLng*/, position/*: Point*/) {
        // useless
    }.bind(this);

    getCoordinate = function(clone: boolean = true) {
        console.log('__fm get coordinate:', this.state.coordinate);
        return clone ? JSON.parse(JSON.stringify(this.state.coordinate)) : this.state.coordinate;
    }.bind(this);

    setCoordinate = function(coordinates: []) {
        console.log('__ fm set coord:', [...coordinates]);
        const unaryCoord = this.toUnaryString(coordinates.length);
        this.setState({coordinate: coordinates, coordinateStr: unaryCoord});
        this.onChange({coordinateStr: unaryCoord});
    }.bind(this);

    onMarkerPress = function() {
        // useless
    }.bind(this);

    toggleGPS = function () {
        console.log('__fm gps toggle');
        if (this.state.geolocalization) this.unfollowUser(); else this.followUser();
    }.bind(this);

    followUser = function(force: boolean = false) {
        console.log('__fm gps follow, force?', force);
        if (!force && this.state.geolocalization) return;
        console.log('__fm gps follow2, force?', force);
        const options: GeolocationOptions = {};
        options.timeout = 5*1000;
        options.enableHighAccuracy = true;
        // Geolocation.requestAuthorization();
        if (!force) this.requestLocationPermission();
        else {
            this.setState({ geolocalization: false, gotFirstLocationUpdate: false });
            setTimeout( this.followUser, 1000);
            return;
        }
        const geoWatcherIdArr = [...this.state.geolocationWatcherID];
        let geolocationWatcherID = Geolocation.watchPosition(this.onPositionReceiveSuccess, this.onPositionReceiveFailure, options);
        geoWatcherIdArr.push(geolocationWatcherID);
        this.setState({geolocalization: true, geolocationWatcherID: geoWatcherIdArr, gotFirstLocationUpdate: false});
    }.bind(this);

    unfollowUser = function() {
        console.log('__fm gps unfollow');
        if (!this.state.geolocalization) return;
        console.log('__fm gps unfollow2');

        const geoWatcherIdArr = [...this.state.geolocationWatcherID];
        for (let id of geoWatcherIdArr) Geolocation.clearWatch(id); //questo dovrebbe fermare un singolo observer mirato
        Geolocation.stopObserving(); // questo tutti e ferma il servizio, ma se lo chiamo senza chiudere tutti miratamente mi da warning a livello gui...
        this.setState({geolocalization: false, gotFirstLocationUpdate: false, geolocationWatcherID: []});
        this.animateCamera2(true);
    }.bind(this);

    onPositionReceiveSuccess = function(response: GeolocationResponse): void{
        console.log('__fm gps receive success');
        // this.state.geoLocalization perchè forse può succedere se arrivano dati che erano pending dopo una chiamata a stopObserving
        const isGeolocalizing = this.state.geolocalization;
        const gotUpdatedOnce = this.state.gotFirstLocationUpdate;
        const coords = response.coords;
        this.setState({userLocation: coords, gotFirstLocationUpdate: gotUpdatedOnce || !isGeolocalizing });
        if (!gotUpdatedOnce && isGeolocalizing) {
            this.animateCamera2(); // non centra bene... solo se lo chiamo da qui e se ci sono ampie distanze.
            // setTimeout( () => this.animateCamera2(), 1000); non risolve manco questo
        }
    }.bind(this);

    onPositionReceiveFailure = function(positionError: GeolocationError): void{
        console.error('__fm gps receive failure', positionError);
    }.bind(this);

    getMap = function() {
        console.log('__fm getMap');
        // get map by ref
        // console.log('getMapByRef:', this.refs.map, this);
        return this.refs.map;
    }.bind(this);

    animateCamera2 = function(forceExceludeUser: boolean = false) {
        //If called in ComponentDidMount in android, it will cause an exception. It is recommended to call it from the MapView onLayout event.
        const userLocation = !forceExceludeUser && this.state.geolocalization && this.state.userLocation;
        const coordinates = userLocation ? [userLocation, ...this.state.coordinate] : this.state.coordinate;
        const map = this.getMap();
        const edgePadding: EdgePadding = {};
        edgePadding.bottom = edgePadding.top = 30;
        edgePadding.left = edgePadding.right = 30;
        const options = {edgePadding: edgePadding, animated: true};
        map && map.fitToCoordinates(coordinates, options);
        /*
        // arguments: camera: Camera, { duration: Number } (significa opzionale? o wrappato?)
        // animateToRegion	region: Region, duration: Number con questo potrei riciclare InitialRegion
        // ?? fitToElements	animated: Boolean
        // fitToSuppliedMarkers	markerIDs: String[], options: { edgePadding: EdgePadding, animated: Boolean }
        */
    }.bind(this);

    markerDelete = function(syntethicEvent, index: number) {
        if (!this.props.allowEditPolygon) return;
        console.log('__fm markerdelete:', index, syntethicEvent);
        const coordinates = this.getCoordinate();
        coordinates.splice(index, 1);
        this.setCoordinate(coordinates);
    }.bind(this);

    onMapReady = function() {
        this.setState({mapReady: true});
        if (this.state.layoutReady) this.onMapAndLayoutReady();
    }.bind(this);

    onLayout = function(): void {
        this.setState({layoutReady: true});
        if (this.state.mapReady) this.onMapAndLayoutReady();
    }.bind(this);

    onMapAndLayoutReady = function() {
        console.log('__fm onMapAndLayoutReady 0');
        if (this.state.onMapAndLayoutReadyCalled) return;
        this.setState({onMapAndLayoutReadyCalled: true});
        this.requestLocationPermission(false);
        const delay = 100;

        console.log('__fm onMapAndLayoutReady 1');
        LogBox.ignoreLogs(['Warning: ' + 'Called stopObserving']);// ignora tutti i warning che iniziano con "Called stopObserving"...
        setTimeout( () => { this.followUser(); }, 1*delay);
        setTimeout( () => { this.unfollowUser(); }, 2*delay);
        //nope setTimeout( () => { this.setState({geolocalization: false, gotFirstLocationUpdate: false}); }, 2*delay);
        setTimeout( () => { this.followUser(); }, 3*delay);

        console.log('__fm onMapAndLayoutReady end');
        // setTimeout( () => {this.animateCamera2(); }, 4000);
        // this.animateCamera2();
    }.bind(this);

    toUnaryString = function(num: number){
        num *= 1;
        console.log('__fm to_unary_str', num);
        let str = "";
        if (num <= 0) return "";
        while (num--) str += "1";
        return str;
    }.bind(this);

    getCenter = function(coords, asBoundRectangle = false) {
        if (asBoundRectangle) return this.getBoundRectangleCenter(coords);
        let center = {latitude: 0, longitude: 0};
        for (let coord of coords) {
            center.latitude += coord.latitude;
            center.longitude += coord.longitude;
        }
        center.latitude /= coords.length;
        center.longitude /= coords.length;
        console.log('__fm getCenter ret', center, ' coords:', coords);
        return center;
    }.bind(this);

    getBoundRectangleCenter = function(coords) {
        let max = {latitude: Number.NEGATIVE_INFINITY, longitude: Number.NEGATIVE_INFINITY};
        let min = {latitude: Number.POSITIVE_INFINITY, longitude: Number.POSITIVE_INFINITY};
        for (let coord of coords) {
            min.latitude = Math.min(min.latitude, coord.latitude);
            min.longitude = Math.min(min.longitude, coord.longitude);
            max.latitude = Math.max(max.latitude, coord.latitude);
            max.longitude = Math.max(max.longitude, coord.longitude);
        }
        let ret = {}
        ret.latitude = (min.latitude + max.latitude) / 2;
        ret.longitude = (min.longitude + max.longitude) / 2;
        console.log('__fm getBoundRectangleCenter ret', ret, min, max, ' coords:', coords);
        return ret;
        // return min;
    }.bind(this);

    render(mapPropStyle) {
        console.log('__fm render()');
        const param = this.params;
        console.log('__fm render1()');
        const field = this.getField();
        const mutedFields = this.getMutedFields();
        console.log('__fm render() getc');
        const coordinate = this.getCoordinate();
        console.log('__fm detail debug show center:', !this.props.allowEditPolygon && !!coordinate && coordinate.length > 2 )
        console.log('## field:', field, "## coordinate:", coordinate, ' tpyeof coordinate: ', typeof (coordinate));
        let mapDrawings = (
            <>
                {/* ------------------ main field ------------ */}
                {this.state.userLocation && this.state.geolocalization && <Marker
                    pinColor={COLOR.MARKER_USER}
                    coordinate={ this.state.userLocation }
                ><MapView.Callout>
                    <Text style={[]}>{"Your position"}</Text>
                </MapView.Callout></Marker>}
                { coordinate && coordinate.length > 2 ? <Polygon
                    coordinates={coordinate}
                    strokeWidth={2}
                    strokeColor={COLOR.MAP_POLYGON_STROKE_MAIN}
                    fillColor={COLOR.MAP_POLYGON_FILL_MAIN}
                    tappable={true}
                /> : null}
                {this.props.allowEditPolygon && !!coordinate && coordinate.map( (latlng, index) => <Marker
                    key={"marker_key_" + index}
                    draggable
                    onDrag={ (syntethicEvent) => { this.markerOnDrag(syntethicEvent, index);} }
                    pinColor={COLOR.MARKER_FIELD}
                    coordinate={ latlng }
                ><MapView.Callout onPress={ (syntethicEvent) => { this.markerDelete(syntethicEvent, index); }}>
                    <View style={[STYLE.fill, STYLE.rowContainer]}>
                        <Text style={[STYLE.centerRow, {textAlign: 'center'}]}>{"Point " + (1 + index)}</Text>
                        <Text style={[STYLE.centerRow]}>Press to delete</Text>
                    </View>
                </MapView.Callout></Marker> )}
                {!this.props.allowEditPolygon && !!coordinate && coordinate.length > 2 ? <Marker
                    key={"marker_key_center"}
                    pinColor={COLOR.MARKER_FIELD}
                    coordinate={ this.getCenter(coordinate) }><MapView.Callout>
                    <View style={[STYLE.fill, STYLE.rowContainer]}>
                        <Text style={[STYLE.centerRow, STYLE.markerTitle]}>{"This field"}</Text>
                        <Text style={[STYLE.centerRow, STYLE.markerBody]}>{field.name + ", " + field.city}</Text>
                    </View>
                </MapView.Callout></Marker> : null}
                {/* ------------------ muted fields ------------ */}
                {/* mutedFields.map(mf => <Polygon coordinates={mf.coordinate} />) /*}
                {/*mutedFields.map(mf => <Marker
                    title={mf.name}
                    description={mf.description}
                    pinColor={COLOR.MARKER_FIELD_MUTED}
                    coordinate={ BoundaryHelper.getCenter(mf) } />)*/}
            </>
        );
        console.log('__fm render map drawings');
        // mapDrawings = [];
        let comment = false;
        if (!mapPropStyle) mapPropStyle = {};
        return (
            <View style={[styles.map, {position: 'relative'}, mapPropStyle]}>
                <MapView ref={'map'} style={[styles.map]}
                                 onLayout={this.onLayout}
                                 onMapReady={this.onMapReady}
                                 mapType={this.state.mapType}
                                 userLocationPriority={'high' || (comment && 'è per la precisione del rilevamento')}
                                 userLocationUpdateInterval={10 * 1000}
                                 userLocationAnnotationTitle={"Your position (userLocationAnnotationTitle?)"}
                                 showsMyLocationButton={true}
                                 showsScale={true}
                                 showsTraffic={false}
                                 showsIndoors={false}
                                 toolbarEnabled={true || comment && '"Navigate" and "Open in Maps" buttons on marker press' }
                                 customMapStyle={MAP_LABEL_STYLE}
                                 loadingEnabled={true}
                                 loadingIndicatorColor={COLOR.MAIN}
                                 loadingBackgroundColor={COLOR.MUTED}
                                 tintColor={COLOR.RED || comment && 'colore del marker di posizione'}
                                 onUserLocationChange = { this.onUserLocationChange }
                                 onPress = { this.onPress }
                                 onDoublePress = { this.onDoublePress }
                                 onMarkerPress = { this.onMarkerPress }
                                 initialRegion={{
                                     latitude: 37.78825,
                                     longitude: -122.4324,
                                     latitudeDelta: 0.0922,
                                     longitudeDelta: 0.0421,
                                 }}
                        >{mapDrawings}</MapView>
            <TouchableOpacity onPress={ this.toggleGPS } style={[ {position: 'absolute', width: 60, height: 60, right: 0}]}>
                <Image style={[{height: '100%', width:'100%'}]}
                       source = { this.state.geolocalization ? require('../../../imgs/marker-color-off.png') : require('../../../imgs/marker-color-on.png')}
                />
            </TouchableOpacity>
        </View>);
}
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        flexGrow: 1,
        marginBottom: 0,
    },
    submit: {
        height: 120,
        marginBottom: 0,
        paddingBottom: 80,
    },
    card: {
        flexBasis: 0,
        minHeight: 170,
        flexWrap: 'nowrap',
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        minHeight: 150,
        flexGrow: 10,
    },
    title_background: {
        width: '100%',
        // marginBottom: 8,
    },
    input:{
    },
    name: {
        fontSize: 20,
        color: MAIN_COLOR,
    },
    city: {
    },
    meteo_image: {
        backgroundColor: 'gray',
        height: 60,
        width: 60,
    },
    body: {
        height: undefined,
        flexGrow: 0,
        // flexShrink: 1
        // backgroundColor: 'red',
    },
    edit_button:{
        height: 60,
        width: 60,
    },

});


const mapStateToProps = (state, props) => {
    let fieldID = props.route && props.route.params && props.route.params.id; // .route.params.id;
    let addProps = {};

    console.log("xxxxx mapstatetoprops:", addProps, "state:", state, 'FieldID', fieldID);
    const emptyField = new Field("namee", "cityy", "descc", "[]", null);
    emptyField.coordinate = [{latitude: 42.18530921673116, longitude: 14.420321434736252}, {latitude: 42.1852602756412, longitude: 14.42043274641037}, {latitude: 42.185234190273235, longitude: 14.420227222144606}];
    addProps.field = fieldID ? FieldSelector.find(state)(fieldID) : emptyField;
    addProps.isUpdate = !!fieldID;
    addProps.fields = FieldSelector.findAll(state)();
    addProps.fields = addProps.fields.filter( field => field.id !== addProps.field.id) || [];
    console.log("xxxxx addProps:", addProps, "state:", state, 'FieldID', fieldID);
    // addProps.field.coordinate = JSON.parse(addProps.field.coordinate);
    console.log("xxxxx addProps 1:", addProps, "state:", state, 'FieldID', fieldID);
    //for (const f of addProps.fields) { f.coordinate = JSON.parse(f.coordinate); }
    console.log("xxxxx addProps 2:", addProps, "state:", state, 'FieldID', fieldID);

    // addProps.field = JSON.parse(JSON.stringify(addProps.field));
    // addProps.fields = JSON.parse(JSON.stringify(addProps.fields));
    console.log('state map return:', addProps);
    console.log('state map fieldID:', fieldID);
    return addProps;
};

const mapDispatchToProps = (dispatch) => {
    return {
        insert_field: INSERT_FIELD_ACTION_REQ(dispatch),
        update_field: UPDATE_FIELD_ACTION_REQ(dispatch),
    };
};

export default FieldMap;
//export default FieldFormComponent;
