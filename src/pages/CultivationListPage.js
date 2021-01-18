import React from 'react';
import {
    Text,
    View,
        } from 'react-native';

import {NetworkContext} from "../navigator/NetworkContext";
import {CultivationCardComponent} from '../components';
class  CultivationListPage extends React.Component{

    render() {
        const cultivations = [{
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
                <Text>{children}</Text>
                <CultivationCardComponent children={"Valore Card Passato da Cultivation List PAGE"} cultivations={cultivations} navigation={navigation} ></CultivationCardComponent>
            </View>
        );
    }
}
export default CultivationListPage;
