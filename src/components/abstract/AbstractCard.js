import React from 'react';
import CultivationCardComponent from '../CultivationCardComponent';
import {Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {STYLE} from '../../styles/styles';

class AbstractCardComponent extends CultivationCardComponent {
    constructor(props){
        super(props);
        console.log('AbstractCard Props ------------------------ props:', this.props);
        console.log('FieldCard props:', this.props, props);

        //costruttore chiamato prima che venga renderizzato il component
    }

    goToDetail = function() {
        this.props.navigation.navigate(this.props.navigate_to, props);
    }.bind(this);

    render() {
        return (
        <View style={[styles.container, this.props.style]}>
                <StatusBar barStyle="light-content" backgroundColor="#009387" />
                <TouchableOpacity onPress={this.goToDetail} style={[styles.card]}>
                        <Image
                            style={styles.card_image}
                            source={this.props.image || this.props.imageph}  />
                        <View style={styles.card_text_container}>
                            <Text numberOfLines={1} style={styles.card_title}>
                                {this.props.title}
                            </Text>
                            <Text numberOfLines={1} style={styles.card_text}>
                                {this.props.subtitle}
                            </Text>
                            <Text numberOfLines={3} style={styles.card_text}>
                                {this.props.body}
                            </Text>
                        </View>
                </TouchableOpacity>
            </View>

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
    },

    /*
    card_container: {
        backgroundColor: '#aaa',
        flex:1,
        padding: 4,
        margin: 4,
        borderRadius: 10,
    },*/
    card: {
        overflow: 'hidden',
        maxWidth: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        margin: 8,
        height: 170,
    },
    card_image: {
        flexBasis:0,
        flexGrow: 1,
        height: '100%',
        borderRadius: 5,
    },
    card_text_container: {
        /*backgroundColor: '#ddd',*/
        flexBasis: 0,
        flexGrow: 2,
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
export default AbstractCardComponent;
