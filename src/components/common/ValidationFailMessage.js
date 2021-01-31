import React, {Component}  from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLOR, STYLE} from '../../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';



class ValidationFailMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const propErrors = this.props.errors ? this.props.errors.join("\n") : "";
        return (
            <View style={[STYLE.columnContainer,STYLE.center,styles.validation_container]}>
                <Icon style={[STYLE.columnContainer,STYLE.center]}
                    name="ios-warning-outline"
                    size={16}
                    color={COLOR.DARK_ORANGE}
                />
            <Text style={styles.validation_text}>{ this.props.children ? this.props.children: propErrors }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    validation_container: {
        margin:10,
        padding: 2,
        borderRadius: 5,
        borderColor: COLOR.DARK_ORANGE,
        borderWidth: 0.5,
    },
    validation_text: {
        margin: 4,
        fontSize: 11,
        color: COLOR.DARK_MUTED,
    },
});

export default ValidationFailMessage;
