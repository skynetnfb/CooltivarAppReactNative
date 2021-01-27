import {StyleSheet} from 'react-native';

const COLOR = {
    MAIN: '#66bb6a',
    MUTED: '#777777',
    LIGHT_MAIN: '#9ccc65',
    ORANGE: '#ffca28',
    IRRIGATION: '#29B6F6FF',
    YELLOW: '#FFEE58FF',
    RED: '#FF7043FF',
    DARK_ORANGE: '#ffa726'
}

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
        alignItems: 'center',
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

export {STYLE, COLOR};
