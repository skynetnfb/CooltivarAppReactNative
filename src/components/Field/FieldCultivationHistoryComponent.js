import React, {Component} from 'react';
import {FlatList, TouchableOpacity, View, Text} from 'react-native';
import {STYLE} from '../../styles/styles';
import AbstractCardComponent from '../abstract/AbstractCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {CultivationSelector} from '../../redux/selector/CultivationSelector';

class FieldCultivationHistoryComponent extends Component{
    /*constructor({route, navigation}) { funziona, ma meglio prenderli direttamente da prop.
        super();
        this.route = route;
        this.navigation = navigation;
    }*/

    render() {
        const navigation = this.props.navigation;
        return (
            <View style={[STYLE.rowContainer, STYLE.fill]}>
                <FlatList
                    data={this.props.cultivations}
                    style={[STYLE.fill]}
                    renderItem={({item}) => (
                        <AbstractCardComponent
                            navigation={navigation}
                            navigate_to={"cultivation"}
                            image={''}
                            imageph={require('../../../imgs/no_content.png')}
                            title={item.name}
                            subtitle={item.cultivar}
                            body={item.description}
                            item = {item}
                            item_id = {item.id}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                    style={[STYLE.footer]}
                    onPress={()=>this.props.navigation.navigate('cultivation_form',{id:null, fieldID: this.props.fieldID})}>
                    <Icon
                        name="md-add-circle-sharp"
                        size={40}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>
        );
        // return (<Text>hello!</Text>);
    }
}


const mapStateToProps = (state, props) => {
    const route1 = props.route;
    const routeParams1 = route1.params;
    const route2 = routeParams1.route;
    const routeParams2 = route2.params;
    let fieldID = routeParams2.id;
    const addProps = {};
    addProps.cultivations = CultivationSelector.findByField(state)(fieldID);
    addProps.fieldID = fieldID;
    console.log("__fch mapstatetoprops:", addProps, "state:", state, 'FieldID', fieldID);
    return addProps;
};


export default connect(mapStateToProps, null)(FieldCultivationHistoryComponent);
