import React from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import AbstractCardComponent from "../components/abstract/AbstractCard";
import {getAllCultivations} from '../model/Repository';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLE} from '../styles/styles';
import {FieldSelector} from '../redux/selector/field';
import {FIND_FIELD_ACTION_REQ, INSERT_FIELD_ACTION_REQ} from '../redux/action/dispatchers/field';
import {connect} from 'react-redux';
import {FIND_CULTIVATION_ACTION_REQ, INSERT_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/cultivation';
import {CultivationSelector} from '../redux/selector/cultivation';


class  CultivationListPage extends React.Component{

constructor(props) {
    super(props);
}
    componentDidMount(): void {
    console.log('####--------------------------------------Cultivation LIST PROPS',this.props);
        //this.setState({cultivations:getAllCultivations()});
        this.props.find_cultivations();
    }

    render() {

        const navigation = this.props.navigation;
        return (
            <View style={[styles.container]}>
                <FlatList
                    data={this.props.cultivations}
                    style={[STYLE.flat_list]}
                    renderItem={({item}) => (
                <AbstractCardComponent
                    navigation={navigation}
                    navigate_to={"cultivation"}
                    image={''}
                    imageph={require('../../imgs/no_content.png')}
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
                    onPress={()=>this.props.navigation.navigate('cultivation_form',{id:null})}>
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
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
    },
});

const mapStateToProps = (state) => {
    let stateret;
    stateret = {
        cultivations: CultivationSelector.findAll(state)(),
        selectors: CultivationSelector,
    };
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        find_cultivations: FIND_CULTIVATION_ACTION_REQ(dispatch),
        insert_cultivation: INSERT_CULTIVATION_ACTION_REQ(dispatch),
    };
};

//TODO item.preview && {uri: item.preview}||
export default connect(mapStateToProps, mapDispatchToProps)(CultivationListPage);

