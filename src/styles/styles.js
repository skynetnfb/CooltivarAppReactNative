import {StyleSheet} from 'react-native';

const COLOR = {
    MAIN: '#66bb6a',
    MUTED: '#777777',
    DARK_MUTED: '#474747',
    LIGHT_MUTED: '#a7a7a7',
    LIGHT_MAIN: '#9ccc65',
    ORANGE: '#ffca28',
    IRRIGATION: '#29B6F6',
    YELLOW: '#FFEE58',
    RED: '#FF7043',
    DARK_ORANGE: '#ffa726',

}
COLOR.MAP_POLYGON_STROKE_MAIN = COLOR.DARK_ORANGE;
COLOR.MAP_POLYGON_FILL_MAIN = COLOR.DARK_ORANGE + '77';
COLOR.MAP_POLYGON_STROKE_MUTED = COLOR.DARK_MUTED;
COLOR.MAP_POLYGON_FILL_MUTED = COLOR.MUTED;
/**  NB: i marker possono avere solo colori con saturazione e luminosità 100%, alcuni rgb validi sono:
red (default)
tomato
orange
yellow
gold
wheat
tan
linen
green
blue / navy
aqua / teal / turquoise
violet / purple / plum
indigo
**/
COLOR.MARKER_USER = 'red';
COLOR.MARKER_FIELD = 'linen';
COLOR.MARKER_FIELD_MUTED = 'wheat';

const STYLE = StyleSheet.create({
    container: {
        width: '100%', // maybe useless
        height: '100%',
    },
    flat_list: {
        height: '100%',
        width: '100%', // maybe useless
    },
    debug: {
        borderWidth: 2,
        borderColor: 'red',
    },
    submit: {
        /*
        borderColor: 'blue',
        borderWidth: 4,
        */
    },
    submitValid: {
        backgroundColor: COLOR.MAIN,
    },
    submitInvalid: {
        backgroundColor: COLOR.MUTED,
    },
    title_background: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: COLOR.MAIN,
    },
    title_text: {
        backgroundColor: COLOR.MAIN,
        color: 'white',
        fontSize: 30,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginStart: 'auto',
        marginEnd: 'auto'
    },
    footer: {
        backgroundColor: COLOR.MAIN,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        margin: 8
    },
    button: {
        backgroundColor: COLOR.MAIN,
        color: 'white',
        display: 'flex',
    },
    button_image: {
        // position: 'absolute',
        // flexGrow: 1,
        // flexBasis: 0,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    button_text:{
        margin: 'auto',
    },


    // for layouting
    rowContainer: {
        display: 'flex',
        flexDirection: 'column',
        // width: '100%',
        //flex: 1,
        flexWrap: 'wrap'
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'row',
        // height: '100%',
        //flex: 1,
    },
    center: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginStart: 'auto',
        marginEnd: 'auto'
    },
    centerColumn: {
        marginTop: 'auto',
        marginBottom: 'auto',
        // width: '100%',
    },
    centerRow: {
        marginStart: 'auto',
        marginEnd: 'auto',
    },
    fill:{
        flexGrow: 1,
        // flexBasis: 0,
    },
    separator_horizontal_bottom: {
        paddingBottom: 4,
        marginBottom: 4,
        borderBottomWidth: 0.5,
        borderColor: '#aaa',
    },
    markerTitle: {
        fontSize: 17,
        fontWeight: "700",
        textAlign: 'center'
    },
    markerBody: {
        textAlign: 'center'
    }
});


const MAP_LABEL_STYLE = [
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

export {STYLE, COLOR, MAP_LABEL_STYLE};
