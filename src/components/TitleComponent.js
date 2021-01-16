import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
class  TitleComponent extends React.Component {

    constructor(props) {
        super(props)
        //costruttore chiamato prima che venga renderizzato il component
    }

    componentDidMount() {
        //viene chiamato quando si deve renderizzare
    }

    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
        //suppongo anche per inviare dei risultati ad alatri componenti
    }

    render() {
        const {title = "title"} = this.props;
        //viene chiamata per renderizzare il component
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
