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
import {COLOR, STYLE} from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {CultivationSelector} from '../redux/selector/CultivationSelector';
import {forecast, getForecastToday} from '../api/api';
import ModalComponent from '../components/abstract/ModalComponent';
import {DELETE_CULTIVATION_ACTION_REQ, UPDATE_CULTIVATION_ACTION_REQ} from '../redux/action/dispatchers/CultivationAction';
import {deleteCultivAction} from '../model/Repository';


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
            if(modalResult){
                this.props.delete_cultivation(this.props.cultivation);
                //this.props.navigation.navigate('home',{user:true})
                this.props.navigation.pop();
            }


        }.bind(this);
    }
    componentDidMount(){

        let coord = {
            latitude:null,
            longitude:null,
        };
        coord.latitude = 10;
        coord.longitude = 30;

        let fc = forecast(coord,3);

        console.log('###-------------------------------------------------forecast:',fc)
    }
    componentWillUnmount(): void {
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
                        icon ={"trash-sharp"}
                        result = {this.resultModal}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('cultivation_form',{ id: this.props.cultivation.id })}>
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
        backgroundColor: COLOR.MAIN,
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
        color: COLOR.MAIN,
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
        cultivation : CultivationSelector.find(state)(routeParams2.id)||new Cultivation(),
        findSelector: CultivationSelector.find(state),
    };
    return stateret;
};

const mapDispatchToProps = (dispatch) => {
    return {
        delete_cultivation: DELETE_CULTIVATION_ACTION_REQ(dispatch),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CultivationDetailComponent);
