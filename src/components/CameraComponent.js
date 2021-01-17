'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native';
import { RNCamera } from 'react-native-camera';



class CameraComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            path: '',
            data:'',

        };
    }

    render() {
        console.log('---------------CameraComponent extends PureComponent');
        return (
            <View style={styles.container}>
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
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor:'blue', height: 200, width: '100%', }}>
                    <Image
                    style={styles.preview_image}
                    source={this.state.data}
                />
                </View>

            </View>


        );
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            this.state.data = await this.camera.takePictureAsync(options);
            this.setState({ path: this.state.data.uri });
            //this.path = data.uri;
            console.log(this.state.data.uri);
            console.log(this.state);
        }
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
        flex: 1,
        width:'100%',
        flexDirection: 'column',
        backgroundColor: 'red',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    preview_image: {
        flex:1,
        width: '100%',
        height: 160,
        borderRadius: 5,
    },
});
export  default CameraComponent;
