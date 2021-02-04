import React, {Component} from 'react';
import {View, ActivityIndicator, Image,Text} from 'react-native';
import {COLOR} from '../styles';


class LoadingPageComponent extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../imgs/logo.png')}
                />
                <Text style={styles.text_logo}>CooltivarApp</Text>
            <ActivityIndicator
                size={'large'}
                color={COLOR.MAIN}
            />
        </View>
        );
    }
}

export default LoadingPageComponent;

const styles = {
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_logo:{
       fontSize:48,
        color:COLOR.MAIN
    },
    logo:{
        height:90,
        width:90,
    }
};
