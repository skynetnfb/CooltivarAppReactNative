import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
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
        <View>
            <View>
                <Button onPress={showDatepicker} title={date.toDateString()||"Select Date"} />
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
