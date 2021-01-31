import React from 'react';

import {
    FlatList, StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';

import AbstractCardComponent from '../components/abstract/AbstractCard';
import {
    FIND_FIELD_ACTION_REQ,
    INSERT_FIELD_ACTION_REQ,
    UPDATE_FIELD_ACTION_REQ,
} from '../redux/action/dispatchers/FieldAction';
import {connect} from 'react-redux';
import {COLOR, STYLE} from '../styles/styles';
import {FIND_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/CultivationAction';
import {getAllCultivations} from '../model/Repository';
import Field from '../model/Field';
import {FieldSelector} from '../redux/selector/FieldSelector';
import Icon from 'react-native-vector-icons/Ionicons';
class  FieldListPage extends React.Component{
    componentDidMount(): void {
        this.props.find_fields();
    }

    count = 0;
    addMockFields = function() {
        console.log("adding mock field...");
        this.props.insert_field( new Field('field_' + this.count++, 'Agrigento', 'primo agr test'));
        // for (let field of this.props.fields) { this.props.insert_field(field); }
    }.bind(this);

    render() {
        //const {title = "cultivation list"} = this.props;
        const {children} = this.props;
        const navigation = this.props.navigation;
        return (
            <View style={styles.container}>

                <TouchableOpacity  onPress={this.addMockFields} style={[styles.card]}>
                    <Text>fields: {this.props.fields.length}</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.props.fields}
                    style={styles.flat_list}
                    renderItem={({item}) => (
                        <AbstractCardComponent
                            style={[]}
                            navigation={navigation}
                            navigate_to={"field"}
                            image={item.image}
                            imageph={require('../../imgs/no_content.png')}
                            title={item.name}
                            subtitle={item.city}
                            body={item.description}
                            item_id = {item.id}
                        />
                )}
                keyExtractor={item => "" + item.id}
                onEndReachedThreshold={0.2}
                showsVerticalScrollIndicator={false}
                />
                <TouchableOpacity
                    style={[STYLE.footer]}
                    onPress={()=>this.props.navigation.navigate('field_form')}>
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
        width: '100%', // maybe useless
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

const mapStateToProps = (state) => {
    let stateret;
    // noinspection TypeScriptValidateTypes
    stateret = {
        fields: FieldSelector.findAll(state)(),
        selectors: FieldSelector,
        /*field: {
            id: state.content.id,
            name: state.content.name,
            city: state.content.city,
            coordinate: state.content.coordinate,
            description: state.content.description,
        }*/
    };

    // DAM: importante! impedirebbe di modificare lo stato originale per errore (pattern violation)
    // ma se cambio le reference degli oggetti nested nelle props react li considera diversi e non ottimizza.
    // stateret = JSON.parse(JSON.stringify(stateret)); // per assicurarmi di non modificare lo stato originale
    return stateret;

};

const mapDispatchToProps = (dispatch) => {
    return {
        find_fields: FIND_FIELD_ACTION_REQ(dispatch),
        insert_field: INSERT_FIELD_ACTION_REQ(dispatch),
        // find_cultivations: FIND_CULTIVATION_ACTION_REQ
        // (field) => dispatch({type: "INSERT_FIELD", field: field}),
    };
};

//TODO item.image && {uri: item.image}

export default connect(mapStateToProps, mapDispatchToProps)(FieldListPage);
