import React from 'react';
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import AbstractCardComponent from "../components/abstract/AbstractCard";
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLE} from '../styles/styles';
import {connect} from 'react-redux';
import {FIND_CULTIVATION_ACTION_REQ, INSERT_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/CultivationAction';
import {CultivationSelector} from '../redux/selector/CultivationSelector';
import ModalComponent from '../components/abstract/ModalComponent';
import {USER_LOGGED_OUT_REQ} from '../redux/action/dispatchers/UserAction';

class  CultivationListPage extends React.Component{

    constructor(props) {
        super(props);
        this.resultModal = function (modalResult) {
            if (modalResult) {
                this.props.userLogoutAction();
                this.props.navigation.navigate('login')
            }
        }.bind(this);
    }
    componentDidMount(): void {
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
                            image={item.preview.length && {uri: item.preview}}
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
                <View style={[STYLE.footer]}>
                    <TouchableOpacity
                        onPress={this.deleteDialog}>
                        <ModalComponent
                            modalMessage = {"Do you want to Logout? "}
                            icon ={"ios-log-out"}
                            buttonLeft ={"Cancel"}
                            buttonRight ={"Confirm"}
                            result = {this.resultModal}
                        >
                            <Icon
                                name="ios-log-out"
                                size={40}
                                color="#FFF"
                            />
                        </ModalComponent>
                    </TouchableOpacity>
                    <TouchableOpacity

                        onPress={()=>this.props.navigation.navigate('cultivation_form',{id:null})}>
                        <Icon
                            name="md-add-circle-sharp"
                            size={40}
                            color="#FFF"
                        />
                    </TouchableOpacity>
                </View>
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
        userLogoutAction:USER_LOGGED_OUT_REQ(dispatch),
    };
};

//TODO item.preview && {uri: item.preview}
export default connect(mapStateToProps, mapDispatchToProps)(CultivationListPage);

