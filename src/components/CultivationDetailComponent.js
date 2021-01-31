import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Cultivation from '../model/Cultivation';
import {STYLE} from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {CultivationSelector} from '../redux/selector/cultivation';
import ModalComponent from './abstract/ModalComponent';
import {DELETE_CULTIVATION_ACTION_REQ, UPDATE_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/cultivation';
import {deleteCultivAction} from '../model/Repository';
import {METEO_FORECAST_REQUEST} from '../redux/action/dispatchers/meteoAction';
import {FieldSelector} from '../redux/selector/field';


class  CultivationDetailComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cultivation: new Cultivation(
                'Loading',
                'Loading',
                'Loading',
                'Loading',
                new Date().toDateString(),
                new Date().toDateString(),
                999,
                'Loading',
                null,
            ),

        };

        this.goToForm = function() {
            this.props.navigation.navigate('cultivation_form');
        }.bind(this);

        this.deleteDialog = function() {

        }.bind(this);

        this.openCamera = function() {
            return (
                this.props.navigation.navigate('camera',{ id: this.props.cultivation.id })
            )
        }.bind(this);

        this.resultModal = function (modalResult){
            console.log('****------------------------------RESULT DETAIL PROPS CULTIVATION:', this.props.cultivation);
            if(modalResult){
                //deleteCultivAction(this.props.cultivation.id);
                this.props.delete_cultivation(this.props.cultivation);
                this.props.navigation.navigate('home',{user:true})
            }


        }.bind(this);
    }
    componentDidMount(){

        const field = this.props.field;
        const coordinate = field && field.coordinate[0]; // || {longitude:-122.49343838542698, latitude:37.7889790728136}; // san francisco
        // this.props.forecast_action(coordinate, field.id); todo: decommenta quando hai il terreno ben linkato
    }

    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
        //suppongo anche per inviare dei risultati ad alatri componenti
    }

    render() {
        return (
            <View style={STYLE.container}>

                <ScrollView style = {styles.scrollView} showsVerticalScrollIndicator ={false}>
                    <TouchableOpacity onPress={this.openCamera}>
                        <Image
                            style={styles.preview_image}
                            source={this.props.cultivation.preview&&{uri: this.props.cultivation.preview}||require('../../imgs/no_cultivation_preview.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.weather_container}>
                        <Image style={styles.icon_image}
                               source={require('../../imgs/open_weather_02n_2x.png')}
                        />
                        <Image style={styles.icon_image}
                               source={require('../../imgs/open_weather_09d_2x.png')}
                        />
                        <Image style={styles.icon_image}
                               source={require('../../imgs/open_weather_13d_2x.png')}
                        />
                    </View>
                    <View style={[styles.description]}>
                        <View style={[styles.card_text_container]}>
                            <View style={[STYLE.rowContainer,STYLE.columnContainer,STYLE.centerColumn,styles.card_title_container]}>
                                <Text numberOfLines={1} style={styles.card_title}>
                                    {this.props.cultivation.name||'Loading...'}
                                </Text>
                                <Text numberOfLines={1} style={styles.card_title}>
                                    {this.props.cultivation.cultivar||'Loading...'}
                                </Text>
                                <Text numberOfLines={1} style={styles.card_title}>
                                    {this.props.cultivation.status||'Loading...'}
                                </Text>
                            </View>
                            <View style={[STYLE.rowContainer,STYLE.columnContainer,STYLE.centerColumn,styles.card_title_container,STYLE.separator_horizontal_bottom]}>
                            <Text numberOfLines={1} style={styles.card_date_text}>
                                {'From: '+new Date(this.props.cultivation.sowingDate).toDateString()||'Loading...'}
                            </Text>
                            <Text numberOfLines={1} style={styles.card_date_text}>
                                {'To: '+ new Date (this.props.cultivation.harvestDate).toDateString()||'Loading...'}
                            </Text>
                            </View>
                            <Text numberOfLines={5} style={styles.card_text}>
                                {'Description : '+this.props.cultivation.description||'Loading...'}
                            </Text>
                            <Text numberOfLines={1} style={styles.card_text}>
                                {'Harvest Weight : '+this.props.cultivation.harvestWeight||'Loading...'}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={[STYLE.footer]}>
                <TouchableOpacity
                    onPress={this.deleteDialog}>
                    <ModalComponent
                        modalMessage = {"Cultivation will be deleted! Are You Sure? "}
                        result = {this.resultModal}
                        buttonLeft={"Undo"}
                        buttonRight={"Confirm"}
                    ><Icon
                            name="trash-sharp"
                            size={40}
                            color="#FFF"
                        />
                    </ModalComponent>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('cultivation_form', {id: this.props.cultivation.id })}>
                    <Icon
                        name="create"
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

    //TODO flat list
    flat_list: {
        height: '100%',
        width: '100%', // maybe useless
    },

    weather_container: {
        flex:1,
        backgroundColor: '#fff',
        padding: 4,
        borderRadius: 8,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        alignSelf: 'stretch',
        margin: 4,
    },
    description: {
        flex:1,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        alignSelf: 'stretch',
        margin: 4,
    },
    footer: {
        backgroundColor: 'green',
        padding: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        width: '100%', // maybe useless
    },
    preview_image: {
        width: '100%',
        height:160,
    },
    icon_image: {
        height:60,
    },
    card_text_container: {
        width: '100%',
    },
    card_title_container: {
        flexDirection:'row',
        justifyContent: 'space-around',
    },
    card_text: {
        textAlign: 'left',
        color: '#AAA',
        fontSize: 15,
        marginTop: 4,
    },
    card_date_text: {
        textAlign: 'left',
        color: '#AAA',
        fontSize: 14,
        marginTop: 4,
    },
    card_title: {
        textAlign: 'left',
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loading_icon: {
        flex: 1,
        justifyContent: 'center',
    },
    empty_collection_text_container: {
        flex: 1,
        justifyContent: 'center',
    },
    empty_collection_text: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
const mapStateToProps = (state,props) => {

    const route = props.route;
    const routeParams1 = route.params;
    const route2 = routeParams1.route;
    const routeParams2 = route2.params;

    let stateret;
    stateret = {
        cultivation : CultivationSelector.find(state)(routeParams2.id) || new Cultivation(),
        field: null,
    };
    stateret.field = stateret.cultivation ? FieldSelector.find(state)(stateret.cultivation.field_id) : [];
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        delete_cultivation: DELETE_CULTIVATION_ACTION_REQ(dispatch),
        forecast_action: METEO_FORECAST_REQUEST(dispatch),

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CultivationDetailComponent);
