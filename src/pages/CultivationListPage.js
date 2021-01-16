import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    StatusBar,} from 'react-native';

import {CultivationCardComponent} from '../components';
import CultivationListComponent from '../components/CultivationListComponent';
class  CultivationListPage extends React.Component{
    /*
        render() {
            return (
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="#009387" />
                    <TouchableOpacity
                        style={styles.card_container}
                        onPress={() => {
                            this.props.navigation.navigate('cultivation_details', {
                                item: {
                                    id: item.id,
                                },
                            });
                        }}>
                                <View style={styles.card}>

                                            <Image
                                                style={styles.card_image}
                                                source={require('../../imgs/no_content.png')}
                                            />
                                    <View style={styles.card_text_container}>
                                        <Text numberOfLines={1} style={styles.card_title}>
                                            "name"
                                        </Text>
                                        <Text numberOfLines={1} style={styles.card_text}>
                                            "status"
                                        </Text>
                                        <Text numberOfLines={3} style={styles.card_text}>
                                            "description descriptionde scriptiond escripti ondescri ptiondescr iptiondescription"
                                        </Text>
                                    </View>
                                </View>

                    </TouchableOpacity>
                </SafeAreaView>

            );
        }*/

    render() {
        //const {title = "cultivation list"} = this.props;
        const {children} = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>{children}</Text>
                <CultivationCardComponent children={"Valore Card Passato da Cultivation List PAGE"}></CultivationCardComponent>
            </View>
        );
    }
}
export default CultivationListPage;
