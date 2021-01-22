'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View,Image,PermissionsAndroid} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Cultivation from '../model/Cultivation';
import {createCultivation} from '../model/Repository';



class CameraComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            data:'',
        };

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

    }

    render() {
        return (
            <View style={styles.container}>
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
                        source={this.state.data}
                    />
                    <View style={styles.buttons_container}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.button_camera}>
                        <Text style={{ fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.savePicture.bind()} style={styles.button_camera}>
                        <Text style={{ fontSize: 14}}> SAVE </Text>
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
            console.log('----------------------TIPO',this.state.data);
            this.setState({ path: this.state.data.uri });
            //let cultivation = new Cultivation('this.state.name', 'this.state.cultivar', 'this.state.description', 1,new Date(),new Date(),999,'Grow', 'TODO' );
            //createCultivation(cultivation);
            //this.path = data.uri;
            console.log(this.state.data.uri);
            console.log(this.state);
            this.requestStoragePermission();
        }
    };
    savePicture = async () => {

    };

    renderImage() {
        return (
            <Image
                source={{ uri: this.path }}
                style={styles.preview}
            />
        );
    }
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
export  default CameraComponent;
