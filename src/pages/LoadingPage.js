import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';

export const LoadingPage = function() {
    return (
        <View style={styles.pageContainer}>
            <ActivityIndicator
                size={'large'}
                color={'rgb(120, 79,246)'}
            />
        </View>
    );
};

class LoadingPageComponent extends Component {
    constructor(props) {
        super(props);
    }
/*
    componentDidMount() {
        const {loading, inLoading} = this.props;
        setTimeout(function() {
            inLoading();
        }, 1000);
    }
*/
    render() {
        return <LoadingPage />;
    }

}
/*
function mapStateToProps(state) {
    const {loading} = state.app;
    return {
        loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        inLoading: function() {
            dispatch({
                type: IN_LOADING,
            });
        }
    };
}*/

export default LoadingPageComponent;

const styles = {
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
