import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {COLOR, STYLE} from '../styles/styles';

class CultivActionCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.goToActionForm = function() {
        }.bind(this);
        this.getIcon= function (){
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
        };

        this.getIconColor= function (){
            switch (this.props.type){
                case "Threat":
                    return COLOR.DARK_ORANGE;
                    break;
                case "Remedy":
                    return COLOR.MAIN;
                    break;
                case "Custom":
                    return COLOR.MUTED;
                    break;
                case "Irrigation":
                    return COLOR.IRRIGATION;
                    break;
                default: return "#aaa";
            }
        }
    }
    componentDidMount(){
    }
    componentWillUnmount(): void {
        //viene chiamata prima di essere distrutto il component
        // se si deve fare qualcosa con qualche evento legato a questo component deve essere fatto qui
        //suppongo anche per inviare dei risultati ad alatri componenti
    }
    render() {
        let type = this.getIcon();
        let iconColor = this.getIconColor();
        return (
            <View style={styles.card_container}>
                <View style={styles.card}>
                    <View style={styles.card_text_container}>
                        <View style={[STYLE.rowContainer,STYLE.columnContainer,STYLE.centerColumn,styles.card_title_container]}>
                            <Icon style={[styles.card_image]}
                                  name={type}
                                  size={40}
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
                                        color={COLOR.MAIN}
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
        height: 120,
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
    }
});
export  default CultivActionCardComponent;
