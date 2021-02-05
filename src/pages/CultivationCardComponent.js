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

class  CultivationCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cultivations: []
        };

        this.data = [{
            id:1,
            name:"coltivazione mock1",
            cultivar:"cultivar mock1",
            description: "descrizione coltivaione mock1",
        },
            {
                id:2,
                name:"coltivazione mock2",
                cultivar:"cultivar mock2",
                description: "descrizione coltivaione mock2",
            },
            {
                id:3,
                name:"coltivazione mock3",
                cultivar:"cultivar mock3",
                description: "descrizione coltivaione mock2",
            }];

        this.goToDetail = function(item) {
            this.props.navigation.navigate('cultivation');
        }.bind(this);
    }
    componentDidMount(){
    }
    componentWillUnmount(): void {
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#009387" />
                <TouchableOpacity style={styles.login_button} onPress={() => {
                    this.props.navigation.navigate('cultivation',{ item: item });
                }}>
                    <View style={styles.card}>
                        <Image
                            style={styles.card_image}
                            source={require('../../imgs/no_content.png')}
                        />
                        <View style={styles.card_text_container}>
                            <Text numberOfLines={1} style={styles.card_title}>
                                {item.name}
                            </Text>
                            <Text numberOfLines={1} style={styles.card_text}>
                                {item.cultivar}
                            </Text>
                            <Text numberOfLines={3} style={styles.card_text}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },

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
export default CultivationCardComponent;
