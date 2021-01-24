import React, {Component} from 'react';
import {
    View,
    TouchableOpacity, FlatList,
} from 'react-native';

import CultivActionCardComponent from "./CultivActionCardComponent";
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLE} from '../styles/styles';
import {getAllCultivActions, getAllCultivations} from '../model/Repository';
import {CultivationSelector} from '../redux/selector/cultivation';
import {FIND_CULTIVATION_ACTION_REQ, INSERT_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/cultivation';
import {connect} from 'react-redux';
import {CultivActionSelector} from '../redux/selector/cultivAction';
import {FIND_OPERATION_ACTION_REQ, INSERT_OPERATION_ACTION_REQ} from '../redux/action/dispatchers/operationDispatcher';


class  CultivActionsHistoryComponent extends Component{
    constructor(props) {
        super(props);

        this.goToActionForm = function() {
            //this.props.navigation.navigate('action form');
            console.log("-----------------------------PROPS NAV Action CARD:",this.props)
        }.bind(this);

        this.getThreatRemedy = function() {
            console.log('---------------------------------getThreatRemedy()');
            let threatsRemedies = [];
            for(let action of this.props.cultivActions){
                console.log('---------------------------------action type:',action);
                if(action.type==='Threat'|| action.type==='Remedy')
                    threatsRemedies.push(action)
            }
            return threatsRemedies;
        }.bind(this);
    }

    componentDidMount(): void {
        //this.setState({cultivActions:getAllCultivActions()});
    }

    render() {
        const route = this.props.route;
        const routeParams1 = route.params;
        const route2 = routeParams1.route;
        const routeParams2 = route2.params;
        console.log('------------cult HISTORY ROUTEPARAM2:',routeParams2);
        const {children} = this.props;
        //let actions = this.getThreatRemedy();
        return (
            <View style={STYLE.container}>
                <FlatList
                    data={this.props.cultivActions}
                    style={[STYLE.flat_list]}
                    renderItem={({item}) => (
                        <CultivActionCardComponent children={"Valore Card CultivActionHistoy"} cultivation_id={routeParams2.id} navigation={this.props.navigation} type={item.type} icon={"ios-warning-sharp"} icon_color ={'red'}></CultivActionCardComponent>
                    )}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                    style={[STYLE.footer]}
                    onPress={()=>this.props.navigation.navigate('action form')}>
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


const mapStateToProps = (state) => {
    let stateret;
    stateret = {
        cultivActions: CultivActionSelector.findAll(state)(),
        selectors: CultivActionSelector,
    };
    console.log('---------------------------------------------CultivActionSelector.findAll(state)():',stateret.cultivActions);
    return stateret;

};

const mapDispatchToProps = (dispatch) => {
    return {
        find_cultivActions: FIND_OPERATION_ACTION_REQ(dispatch),
        insert_cultivAction: INSERT_OPERATION_ACTION_REQ(dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CultivActionsHistoryComponent);
