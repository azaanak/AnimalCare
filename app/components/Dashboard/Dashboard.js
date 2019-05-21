import React, {Component} from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';
import { logout } from '../../actions/LoginActions';

class Dashboard extends Component {
    constructor(props) {
        super(props);           
    };
    attemptLogout = () => {
        var token = '';
        this.props.authLogout();
        this.props.navigation.navigate('Login');
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center'}} >
                <Text>{'Welcome '+this.props.authState.fullName}</Text>
                <Button color='#901000' title='Logout' onPress={this.attemptLogout} />
            </View>
        )
    }
};

import { connect } from 'react-redux';
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)