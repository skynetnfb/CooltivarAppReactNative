import React from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
class  CultivActionCardComponent extends React.Component{
    constructor(props){
        super(props);
        //costruttore chiamato prima che venga renderizzato il component
        this.goToDetail = function() {
            this.props.navigation.navigate('cultivation');
        }.bind(this);
    }
    componentDidMount(){
        //viene chiamato quando si deve renderizzare
    }
    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
        //suppongo anche per inviare dei risultati ad alatri componenti
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#009387" />
                <TouchableOpacity style={styles.login_button} onPress={this.goToDetail}>
                    <View style={styles.card}>
                        <Image
                            style={styles.card_image}
                            source={require('../../imgs/icon_orange.png')}
                        />
                        <View style={styles.card_text_container}>
                            <Text numberOfLines={1} style={styles.card_title}>
                                "Remedy"
                            </Text>
                            <Text numberOfLines={1} style={styles.card_text}>
                                "status"
                            </Text>
                            <Text numberOfLines={3} style={styles.card_text}>
                                "description descriptionde scriptiond escripti ondescri ptiondescr iptiondescription"
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>

        );
    }

    /*
    render() {
        const {children} = this.props;
        //viene chiamata per renderizzare il component
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <Text>{children}</Text>
            </View>
        );
    }*/

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    //TODO flat list
    flat_list: {
        height: '100%',
        width: '100%', // maybe useless
    },
    card_container: {
        backgroundColor: '#aaa',
        flex:1,
        padding: 4,
        borderRadius: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        height: 170,
        width: '100%', // maybe useless
    },
    card_image: {
        width: '30%',
        height: '100%',
        borderRadius: 5,
    },
    card_text_container: {
        backgroundColor: '#ddd',
        width: '70%',
        padding: 3,
        margin: 4,
    },
    card_text: {
        textAlign: 'left',
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    },
    card_title: {
        textAlign: 'left',
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loading_icon: {
        flex: 1,
        justifyContent: 'center',
    },
    empty_collection_text_container: {
        flex: 1,
        justifyContent: 'center',
    },
    empty_collection_text: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
export  default CultivActionCardComponent;
