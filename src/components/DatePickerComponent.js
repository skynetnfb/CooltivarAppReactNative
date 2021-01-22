import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePickerComponent = (props) => {
    const [date, setDate] = useState(new Date("2021-01-01"));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = function(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
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
                <Button color="green" onPress={showDatepicker} title={date.toDateString()||"Select Date"} />
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
        backgroundColor: 'green',
        width: '100%',
        padding: 2,
        borderRadius: 8,
    },
    button_container: {
        paddingVertical: 2,
        paddingHorizontal: 100,
    },
    confirm_button: {
        backgroundColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirm_button_text: {
        fontSize: 20,
        color: '#fff',
    },
});
