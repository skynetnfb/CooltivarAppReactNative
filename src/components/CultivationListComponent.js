import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,} from 'react-native';

import {CultivationCardComponent} from '../components';
import RootNavigator from "../navigator/RootNavigator";
class  CultivationListComponent extends React.Component{
    constructor(props) {
        super(props);
    }
     render() {
    //const {title = "cultivation list"} = this.props;
        const {children} = this.props;
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
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>{children}</Text>
                <CultivationCardComponent children={"Valore Card Passato da Cultivation List Component***"} cultivations = {cultivations}></CultivationCardComponent>
            </View>
        );
    }
}



/*
function mapStateToProps(state) {
    return {
        collection: cultivations(state),
    };
}*/

export default CultivationListComponent;
