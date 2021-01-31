import React, {useState} from 'react';
import {View, Platform, StyleSheet, TouchableOpacity, TouchableHighlight, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLOR} from '../../styles/styles';

export const DatePickerComponent = (props) => {
    const [date, setDate] = useState(new Date(props.initial_value.toString()));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = function(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        console.log("date picked date changed:", "selectedDate:", selectedDate, "currentDate:", currentDate)
        setDate(currentDate);
        props.result(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={props.style}>
            <View style={styles.date_container}>
                <TouchableOpacity style={styles.date_button} onPress={showDatepicker}>
                    <Text style={styles.button_text}>{date.toDateString() || 'Select Date'}</Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    date_container: {
        width: '100%',
    },
    date_button: {
        backgroundColor: COLOR.MAIN,
        padding: 10,
        borderColor: COLOR.MAIN,
        borderWidth: 1.5,
        borderRadius: 8,
    },
    button_text:{
        color: '#fff',
    },
    button_container: {
        paddingVertical: 2,
        paddingHorizontal: 100,
    },
    confirm_button: {
        backgroundColor: COLOR.MAIN,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirm_button_text: {
        fontSize: 20,
        color: '#fff',
    },
});
