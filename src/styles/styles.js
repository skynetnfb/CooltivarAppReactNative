import {StyleSheet} from 'react-native';

const MAIN_COLOR = '#66bb6a';
const MUTED_COLOR = '#777777';

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
        backgroundColor: MAIN_COLOR,
    },
    submitInvalid: {
        backgroundColor: MUTED_COLOR,
    },
    title_background: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: MAIN_COLOR,
    },
    title_text: {
        backgroundColor: MAIN_COLOR,
        color: 'white',
        fontSize: 30,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginStart: 'auto',
        marginEnd: 'auto'
    },
    footer: {
        backgroundColor: MAIN_COLOR,
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
        backgroundColor: MAIN_COLOR,
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
        marginEnd: 'auto'
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
});

export {STYLE, MAIN_COLOR, MUTED_COLOR};
