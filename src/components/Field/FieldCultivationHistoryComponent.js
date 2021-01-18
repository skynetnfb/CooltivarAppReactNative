import React, {Component} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';

class FieldCultivationHistoryComponent extends Component{
    /*constructor({route, navigation}) { funziona, ma meglio prenderli direttamente da prop.
        super();
        this.route = route;
        this.navigation = navigation;
    }*/
    render() {
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        // const navigationParams = this.props.navigation.getParam("params_object");
        return (
            <>
            <Text>
                Field Cultivation history component
            </Text>
                <Text>{ "\nroute:\n\n" + JSON.stringify(routeParams2, null, 4) }</Text>
                <Text>{ "\nprops:\n\n" + JSON.stringify(this.props, null, 4) } }</Text>
             </>
        );
    }
}

export default FieldCultivationHistoryComponent;
