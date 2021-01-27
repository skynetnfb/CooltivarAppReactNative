import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {STYLE} from '../styles/styles';
class  CultivActionCardComponent extends React.Component{
    constructor(props){
        super(props);
        //costruttore chiamato prima che venga renderizzato il component
        this.goToActionForm = function() {
            //this.props.navigation.navigate('action form');
        }.bind(this);

        this.getIcon= function (){
            //console.log('--------------------------------------------TYPE:',this.props.type)
            switch (this.props.type){
                case "Threat":
                    return "ios-warning-sharp";
                    break
                case "Remedy":
                    return "ios-checkmark-circle-sharp";
                    break
                case "Custom":
                    return "cog-sharp";
                    break
                case "Irrigation":
                    return "md-water-sharp";
                    break
                default:return "cog-sharp";
            }
        }

        this.getIconColor= function (){
            //console.log('--------------------------------------------Color:',this.props.type)
            switch (this.props.type){
                case "Threat":
                    return "orange";
                    break;
                case "Remedy":
                    return "green";
                    break;
                case "Custom":
                    return "#aaa";
                    break;
                case "Irrigation":
                    return "blue";
                    break;
                default: return "#aaa";
            }
        }
    }
    componentDidMount(){
        //viene chiamato quando si deve renderizzare
    }
    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
        //suppongo anche per inviare dei risultati ad alatri componenti
    }
    render() {
        let type = this.getIcon();
        let iconColor = this.getIconColor();
        console.log('*#--------------------------------------------PROPS:',this.props);
        return (

            <View style={styles.card_container}>

                    <View style={styles.card}>

                        <View style={styles.card_text_container}>
                            <View style={[STYLE.rowContainer,STYLE.columnContainer,STYLE.centerColumn,styles.card_title_container]}>
                                    <Icon style={[styles.card_image]}
                                            name={type}
                                            size={60}
                                            color={iconColor}
                                />
                            <Text numberOfLines={1} style={[styles.card_title]}>
                                {this.props.cultivAction.type}
                            </Text>
                            <Text numberOfLines={1} style={styles.card_title}>
                                {this.props.cultivAction.status}
                            </Text>
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('action form',{cultivAction:this.props.cultivAction})}>
                                    <View style={[STYLE.centerColumn]} >
                                        <Icon
                                        name="ios-settings-sharp"
                                        size={24}
                                        color="green"
                                    />
                                    </View>
                                </TouchableOpacity>

                                </View>

                            <View style={[STYLE.rowContainer,STYLE.separator_horizontal_bottom,styles.card_title_container]}>
                                <Text numberOfLines={1} style={styles.card_date}>
                                    From: "{new Date (this.props.cultivAction.startDate).toDateString()}
                                </Text>
                                <Text numberOfLines={1} style={styles.card_date}>
                                    to: {new Date (this.props.cultivAction.endDate).toDateString()}
                                </Text>
                            </View>
                            <Text numberOfLines={3} style={styles.card_text}>
                                Description: {this.props.cultivAction.description}

                            </Text>
                        </View>

                    </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
    },
    card_container: {
        flex:1,
        padding: 4,
        width: '100%',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 4,
        borderRadius: 10,
        flexDirection:'row',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#aaa',
        height: 160,
        width: '100%', // maybe useless
    },
    card_image: {
        height: '100%',
        borderRadius: 5,
    },
    card_icon_right: {
        width: '30%',
        height: '100%',
        borderRadius: 5,
        flexDirection: 'row-reverse',
    },
    card_text_container: {
        flexDirection:'column',
        width: '100%',
        padding: 3,
        margin: 4,
    },
    card_text: {
        textAlign: 'left',
        color: '#aaa',
        fontSize: 12,
        margin: 4,
        marginTop: 8,
    },
    card_title: {
        flex:0,
        textAlign: 'center',
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'column',
        alignSelf:'center',
        marginBottom: 4,
    },
    card_date: {
        textAlign: 'left',
        color: '#aaa',
        fontSize: 12,
        fontWeight: 'bold',
    },
    card_title_container: {
        flexDirection:'row',
        justifyContent: 'space-around',
        marginBottom: 4,
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
export  default CultivActionCardComponent;
