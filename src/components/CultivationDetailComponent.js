import React from 'react';
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Cultivation from '../model/Cultivation';


class  CultivationDetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cultivation: {},
        };

        this.goToForm = function() {
            this.props.navigation.navigate('cultivation_form');
        }.bind(this);

        this.openCamera = function() {
            return (
                this.props.navigation.navigate('camera')
            )
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
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        console.log('------------cult detail ROUTEPARAM2:',routeParams2);
        console.log('------------cult detail navigation:',routeParams2);
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#009387" />
                <TouchableOpacity onPress={this.openCamera}>
                    <Image
                        style={styles.preview_image}
                        source={require('../../imgs/no_cultivation_preview.png')}
                    />
                </TouchableOpacity>

                <View style={styles.card}>
                    <Image style={styles.icon_image}
                        source={require('../../imgs/open_weather_02n_2x.png')}
                    />
                    <Image style={styles.icon_image}
                        source={require('../../imgs/open_weather_09d_2x.png')}
                    />
                    <Image style={styles.icon_image}
                        source={require('../../imgs/open_weather_13d_2x.png')}
                    />
                </View>
                    <View style={styles.description}>
                        <View style={styles.card_text_container}>
                            <Text numberOfLines={1} style={styles.card_title}>
                                "name"
                            </Text>
                            <Text numberOfLines={1} style={styles.card_text}>
                                "status"
                            </Text>
                            <Text numberOfLines={3} style={styles.card_text}>
                                "description descriptionde scriptiond escripti ondescri ptiondescr iptiondescription"
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.footer}
                    onPress={()=>this.props.navigation.navigate('cultivation_form',{ cultivation: this.state.cultivation })}>
                            <Text>
                                "button"
                            </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        justifyContent: 'space-between'
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
        width: '100%', // maybe useless
        alignSelf: 'stretch',
    },
    description: {
        flex:1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        width: '100%', // maybe useless
        alignSelf: 'stretch',
    },
    footer: {
        backgroundColor: 'green',
        padding: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        width: '100%', // maybe useless
    },
    preview_image: {
        width: '100%',
        height: 160,
        borderRadius: 5,
    },
    icon_image: {
        width: '33%',
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
        fontSize: 20,
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
export default CultivationDetailComponent;
