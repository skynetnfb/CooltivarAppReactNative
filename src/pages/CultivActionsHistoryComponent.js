import React, {Component} from 'react';
import {
    View,
    TouchableOpacity, FlatList,
} from 'react-native';

import CultivActionCardComponent from "./CultivActionCardComponent";
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLE} from '../styles/styles';
import {connect} from 'react-redux';
import {CultivActionSelector} from '../redux/selector/CultivActionSelector';
import {
    FIND_OPERATION_ACTION_REQ,
    FIND_OPERATION_BY_CULTIVATION_ACTION_REQ,
    INSERT_OPERATION_ACTION_REQ,
} from '../redux/action/dispatchers/OperationAction';
import {CultivActionEnum} from '../redux/action/enum/OperationEnum';



class  CultivActionsHistoryComponent extends Component{
    constructor(props) {
        super(props);

        this.state= {
        };

        this.goToActionForm = function() {
            //this.props.navigation.navigate('action form');
        }.bind(this);


    }
    componentDidMount(): void {
        //this.setState({cultivActions:getAllCultivActions()});
        this.props.find_cultivActions(this.props.route.params.route.params.id);
    }

    render() {
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        console.log('***--------------------------LIST this.props.cultivActions',this.props);
        return (
            <View style={STYLE.container}>
                <FlatList
                    data={this.props.cultivActions}
                    style={[STYLE.flat_list]}
                    renderItem={({item}) => (
                <CultivActionCardComponent children={"Valore Card CultivActionHistoy"} cultivAction={item} cultivation_id={routeParams2.id} navigation={this.props.navigation} type={item.type} icon={"ios-warning-sharp"} icon_color ={'red'}></CultivActionCardComponent>
                    )}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                    style={[STYLE.footer]}
                    onPress={()=>this.props.navigation.navigate('action form',{cultivation_id:routeParams2.id})}>
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


const mapStateToProps = (state,props) => {
    let stateret;
    stateret = {
        cultivActions: CultivActionSelector.findAllByCultivation(state)(props.route.params.route.params.id),
    };
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        find_cultivActions: FIND_OPERATION_BY_CULTIVATION_ACTION_REQ(dispatch),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CultivActionsHistoryComponent);
