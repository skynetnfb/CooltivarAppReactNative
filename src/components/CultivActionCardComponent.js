import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
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
            <View style={styles.card_container}>
                <TouchableOpacity onPress={this.goToDetail}>
                    <View style={styles.card}>
                        <View><Icon style={styles.card_image}
                            name="ios-warning-sharp"
                            size={60}
                            color="#CCC"
                        />
                        </View>
                        <View style={styles.card_text_container}>
                            <View style={styles.card_title_container}>
                            <Text numberOfLines={1} style={styles.card_title}>
                                "Remedy"
                            </Text>
                            <Text numberOfLines={1} style={styles.card_text}>
                                "status"
                            </Text>
                                </View>

                            <Text numberOfLines={3} style={styles.card_text}>
                                "description descriptionde scriptiond escripti ondescri ptiondescr iptiondescription"
                            </Text>
                        </View>
                        <View><Icon
                            name="ios-settings-sharp"
                            size={30}
                            color="#CCC"
                        /></View>
                    </View>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    card_container: {
        backgroundColor: '#aaa',
        flex:1,
        padding: 4,
        borderRadius: 10,
        width: '100%',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        height: 170,
        width: '100%', // maybe useless
    },
    card_image: {
        height: '100%',
        borderRadius: 5,
    },
    card_icon_right: {
        width: '30%',
        height: '100%',
        borderRadius: 5,
        flexDirection: 'row-reverse',
    },
    card_text_container: {
        flexDirection:'column',
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
    card_title_container: {
        flexDirection:'row',
        justifyContent: 'space-around',
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
