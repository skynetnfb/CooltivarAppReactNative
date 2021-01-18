import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import AbstractCardComponent from '../components/abstract/AbstractCard';
class  FieldListPage extends React.Component{
    render() {
        //const {title = "cultivation list"} = this.props;
        const {children} = this.props;
        const navigation = this.props.navigation;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>{children}</Text>
                <AbstractCardComponent
                    navigation={navigation}
                    navigate_to={"field"}
                    image={null}
                    imageph={require('../../imgs/no_content.png')}
                    title={"title"}
                    subtitle={"subtitle"}
                    body={"description descri fdgds desc description descri fdgds desc description descri fdgds desc description descri fdgds desc"}
                />
            </View>
        );
    }
}
export default FieldListPage;
