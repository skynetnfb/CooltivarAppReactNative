import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ModalComponent = (props) => {
    console.log('#######------------------------------MODAL Compoent:',);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState(props.modalMessage);
    const [modalResult, setModalResult] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <View style={styles.button_container}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#66bb6a" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setModalVisible(false);
                                props.result(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#FF7043FF" }}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                setModalVisible(false);
                                props.result(true);
                            }}
                            value={modalResult}
                        >
                            <Text style={styles.textStyle}>Confirm</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </View>
            </Modal>

            <TouchableHighlight
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Icon
                    name="ios-trash-sharp"
                    size={40}
                    color="#FFF"
                />
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        width: 100,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button_container:{
        width: '100%',
       flexDirection:'row',
       justifyContent: 'space-around'
    }
});

export default ModalComponent;
