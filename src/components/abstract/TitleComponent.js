import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
class  TitleComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount(): void {
    }

    render() {
        const {title = "title"} = this.props;
        return (
            <View style={styles.title_container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title_container: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        height: 60,
        width: '100%',
        marginBottom:4,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#fff',

    }
});

export default TitleComponent;
