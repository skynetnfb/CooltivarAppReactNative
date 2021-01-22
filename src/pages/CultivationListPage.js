import React from 'react';
import {
    FlatList, StyleSheet, TouchableOpacity,
    View,
} from 'react-native';

import AbstractCardComponent from "../components/abstract/AbstractCard";
import {getAllCultivations} from '../model/Repository';
import Icon from 'react-native-vector-icons/Ionicons';
class  CultivationListPage extends React.Component{

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={getAllCultivations()}
                    style={styles.flat_list}
                    renderItem={({item}) => (
                <AbstractCardComponent
                    navigation={navigation}
                    navigate_to={"cultivation"}
                    image={null}
                    imageph={require('../../imgs/no_content.png')}
                    title={item.name}
                    subtitle={item.cultivar}
                    body={item.description}
                />
                )}
                keyExtractor={item => item.id.toString()}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                    style={styles.footer}
                    onPress={()=>this.props.navigation.navigate('cultivation_form')}>
                    <Icon
                        name="md-add-circle-sharp"
                        size={40}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flat_list: {
        height: '100%',
        width: '100%', // maybe useless
    },
        container: {
            justifyContent: "center",
            alignItems: "center",
            height: '100%',
            width: '70%', // maybe useless
        },
        footer: {
            backgroundColor: 'green',
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#aaa',
            width: '100%', // maybe useless
        }
});
//<CultivationCardComponent children={"Valore Card Passato da Cultivation List PAGE"} cultivations={cultivations} navigation={navigation} ></CultivationCardComponent>
export default CultivationListPage;
