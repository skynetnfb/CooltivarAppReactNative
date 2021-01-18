import React from 'react';
import {
    ActivityIndicator, FlatList,
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

        //costruttore chiamato prima che venga renderizzato il component
        this.goToDetail = function(item) {
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
        console.log("------------"+this.data);
        console.log("------------"+this.data[1].id);
        console.log("------------this.props.cultivations: "+this.props.cultivations);
        console.log("------------this.props.children:"+this.props.children.toString());
        //una cosa stranissima in debug se non stampo this.props.children:"+this.props.children.toString() le cultivations arrivano vuote...ASSURDO!!!
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#009387" />
                <FlatList
                    data={this.props.cultivations}
                    style={styles.flat_list}
                    renderItem={({item}) => (
                <TouchableOpacity style={styles.login_button} onPress={() => {
                    //TODO non so per quale motivo non riesco a settare il parametro neanche a mano
                    this.props.navigation.setParams({
                        item: {
                            id: item.id,
                        },
                    });
                    this.props.navigation.navigate('cultivation');
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
                    )}
                    keyExtractor={item => item.id}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                />
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
export default CultivationCardComponent;
