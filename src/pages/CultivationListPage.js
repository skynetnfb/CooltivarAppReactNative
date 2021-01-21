import React from 'react';
import {
    FlatList, StyleSheet,
    Text,
    View,
} from 'react-native';



import AbstractCardComponent from "../components/abstract/AbstractCard";
import {getAllCultivations} from '../model/Repository';
class  CultivationListPage extends React.Component{

    render() {

        console.log('--------------------------------------------####### temp = getAllCul(); :',JSON.stringify(getAllCultivations()));
        const cultivations = [
            {
                id:2,
                name:"coltivazione mock2",
                cultivar:"cultivar mock2",
                description: "descrizione coltivaione mock2",
            },{
                id:1,
                name:"coltivazione mock1",
                cultivar:"cultivar mock1",
                description: "descrizione coltivaione mock1",
            },{
                id:1,
                name:"coltivazione mock1",
                cultivar:"cultivar mock1",
                description: "descrizione coltivaione mock1",
            }];
        //const {title = "cultivation list"} = this.props;
        const {children} = this.props;
        const navigation = this.props.navigation;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flat_list: {
        height: '100%',
        width: '100%', // maybe useless
    },
});
//<CultivationCardComponent children={"Valore Card Passato da Cultivation List PAGE"} cultivations={cultivations} navigation={navigation} ></CultivationCardComponent>
export default CultivationListPage;
