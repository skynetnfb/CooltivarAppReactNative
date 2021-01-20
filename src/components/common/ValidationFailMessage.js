import React, {Component}  from 'react';
import {View, Text, StyleSheet} from 'react-native';



class ValidationFailMessage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const propErrors = this.props.errors ? this.props.errors.join("\n") : "";
        return (
            <Text style={styles.validation}>{ this.props.children ? this.props.children: propErrors }</Text>
        );
    }
}

const styles = StyleSheet.create({
    validation: {
        backgroundColor: '#ff0000',
        borderColor: 'green',
        borderWidth: 2,
    }
});

export default ValidationFailMessage;
