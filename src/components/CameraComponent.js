'use strict';
import React, { PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    PermissionsAndroid,
    ToastAndroid,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Cultivation from '../model/Cultivation';
import {createCultivation, updateCultivation} from '../model/Repository';
var RNFS = require('react-native-fs');
import RNFetchBlob from 'react-native-fetch-blob'
import {STYLE} from '../styles/styles';
import {CultivationSelector} from '../redux/selector/cultivation';
import {INSERT_CULTIVATION_ACTION_REQ, UPDATE_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/cultivation';
import {connect} from 'react-redux';
// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
//var PATH = RNFS.DocumentDirectoryPath + '/cultivation_id.txt';




class CameraComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            data:'',
            cultivation:this.props.cultivation,
        };
        let PATH = RNFetchBlob.fs.dirs.DocumentDir;
        if(this.props.cultivation!=null){
        PATH = RNFetchBlob.fs.dirs.DocumentDir + this.props.cultivation.id;
        this.state.path=this.props.cultivation.preview;
        }

        this.requestStoragePermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Cool Photo App Storage Permission",
                        message:"Storage Permission ",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("You can use the camera");
                } else {
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        };

        this.savePicture = function () {
// write the file
            RNFetchBlob.fs.writeFile(PATH, this.state.data.base64, 'base64')
                .then(() => {
                    console.log('FILE WRITTEN!');
                    console.log('##--------------------------------------------------------FILE WRITTEN on PATH!',PATH );
                    this.setState({path:'file://'+PATH});
                    this.updateCultivationpreview('file://'+PATH+"-"+new Date().toDateString());
                    if (true) {
                        RNFetchBlob.android.actionViewIntent(this.props.cultivation.id, 'application/pdf').then(r => {console.log('THEN')});
                    } else {
                        RNFetchBlob.ios.previewDocument(this.state.path);
                    }
                }).catch((err) => {
                console.log('##--------------------------------------------------------Catch ERROR!!!!!',err);
                    console.log(err.message);
                });
        }.bind(this);

        this.updateCultivationpreview = function (path) {
                let _cultivation = new Cultivation();
                    _cultivation.clone(this.props.cultivation);
                    _cultivation.preview = this.state.path;
                    console.log("###-------------------------------------------------Clone:",_cultivation)
            updateCultivation(_cultivation);
            ToastAndroid.showWithGravity(
                "Preview Updated!",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            this.props.update_cultivation(_cultivation);
        }.bind(this);

    }

    render() {
        return (
            <View style={STYLE.container}>
                <View style={styles.preview_container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                </View>

                <View style={styles.preview_container}>
                    <Image
                        style={styles.preview_image}
                        source={{uri: this.state.path}}
                    />
                    <View style={styles.buttons_container}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.button_camera}>
                        <Text style={styles.buttons_text}> SNAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.savePicture} style={styles.button_camera}>
                        <Text style={styles.buttons_text}> SAVE </Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            this.state.data = await this.camera.takePictureAsync(options);
            this.setState({ path: this.state.data.uri });
            console.log('#####------------------------------------------------------SNAP PATH',this.state.data.uri);
            this.requestStoragePermission();
        }
    };
    /*
    renderImage() {
        return (
            <Image
                source={{ uri: this.path }}
                style={styles.preview}
            />
        );
    }*/
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:'100%',
        height: '100%',
        backgroundColor: '#000',
    },
    preview_container: {
        flex:1,
        width:'100%',
        height: '50%',
        backgroundColor: 'black',
    },
    preview: {
        height: '10%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttons_container: {
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    buttons_text: {
        color:'#FFF',
        fontSize:16,
        alignItems: 'center',
    },
    button_camera: {
        backgroundColor: 'green',
        padding: 15,
        width:'50%',
        paddingHorizontal: 20,
        alignSelf: 'center',
        alignItems: 'center',
        margin: 4,
    },
    preview_image: {
        flex:1,
        width:'90%',
        margin: 10,
        borderRadius: 5,
        alignSelf: 'center',
    },
});
const mapStateToProps = (state,props) => {
    let stateret;
    stateret = {
        cultivation:props.route.params.id? CultivationSelector.find(state)(props.route.params.id):null,
        selectors: CultivationSelector,
    };
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        update_cultivation: UPDATE_CULTIVATION_ACTION_REQ(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraComponent);
