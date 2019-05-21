import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';
import { logout } from '../../actions/LoginActions';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';

class Logout extends Component {
    attemptLogout = () => {
        this.props.authLogout();
        const resetAction = StackActions.reset({
            index: 0,
            key: null, // <-- this
            actions: [NavigationActions.navigate({ routeName: "Login" })]
        });
        this.props.navigation.dispatch(resetAction);
    };
    componentWillMount(){
        this.attemptLogout();
    };
    render() {
        return null;
    }
};

const mapStateToProps = (state) =>{
    return {
        authState: state.authState
    };
}

export const actionCreator = (type, payload = null) => ({ type, payload })

const mapDispatchToProps = (dispatch) => {
    return {
        authLogout: () => {
            AsyncStorage.multiRemove(['token','authenticated']);
            dispatch( logout() );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)