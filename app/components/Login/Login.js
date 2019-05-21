import React, { Component } from 'react'
import SQLite from 'react-native-sqlite-storage';
import { 
    Text, View, Image, Keyboard, AsyncStorage,
    TouchableWithoutFeedback, TouchableOpacity 
} from 'react-native';
import TextInputComponent from '../Utils/TextInputComponent';
import dataController from '../../resources/localDB/DataController';
import { ValidateUser } from '../WebServices/BarnManagerApi';
import { LogsInfo } from '../Utils/LogsInfo';
import { loginStyles } from './Styles';
import { Constants } from '../../resources/constants/Constants';
import { loginSuccess } from '../../actions/LoginActions';

import { NavigationActions, StackActions } from 'react-navigation';
var db = SQLite.openDatabase(Constants.dbName, "1.0", "BarnManager Database", 200000);

class Login extends Component{
    constructor(props) {
        super(props);
        //this.store = this.props.store;      "sandeshkumar@folio3.com"
        this.state = {
            username: "saad",
            password: "Click123@",
            token: '',
            error: false,
            errorMsg: '',
        };
    }
    resetErrorMessage = (username) => {
        if(this.state.error){
            this.setState({ 
                error: false,
                errorMsg: ''
            });
        }
    };
    onUserNameChanged = (username) => {
        this.setState({ username: username });
        this.resetErrorMessage();
    };
    onPasswordChanged = (password) => {
        this.setState({ password: password });
        this.resetErrorMessage();
    };
    navigateToDashboard = () => {
        const resetAction = StackActions.reset({
            index: 0,
            key: null, // <-- this
            actions: [NavigationActions.navigate({ routeName: "DashboardDrawerNavigator" })]
        });
        this.props.navigation.dispatch(resetAction);
    };

    userAuthenticated = (user, accessToken) => {
        LogsInfo('userAuthenticated function');
        this.setState({ 
            token: accessToken,
            error: false, 
            errorMsg: '',
            username: '',
            password:''
        });
        // LogsInfo('State token is =>'+this.state.token);
        this.props.authSuccess(this.state.token, user.firstName+' '+user.lastName);
        this.navigateToDashboard();
    };

    validateUserCallback = (userRecord) => {
        if(userRecord == null){
            LogsInfo('Login user NOT found in local database.');
            this.callRestService();
        }else{
            LogsInfo('Login user found in local database.');
            this.userAuthenticated(userRecord, userRecord.accessToken);
        }
    };

    onLoginClicked = () => {
        if(this.state.username.trim() != '' && this.state.password.trim != ''){
            LogsInfo('username and password is not empty');
            //dataController.validateUser(db, this.state, this.validateUserCallback);
            this.callRestService();
        }
    };

    callRestService = () => {
        LogsInfo('Going to call remote rest service for user authorization!');
        ValidateUser(this.state.username, this.state.password)
        .then((responseJson) => {
            if(responseJson.message === "Invalid username or password.") {
                this.setState({ error: true, errorMsg: responseJson.message });
            }
            else {
                LogsInfo('rest data received ==>'+responseJson.result.user.firstName);
                dataController.saveLoginUserData(db, responseJson.result, this.state);
                this.userAuthenticated(responseJson.result.user, responseJson.result.accessToken);
            }
        })
        .catch((error) => {
            LogsInfo('error calling service.');
        });
    };
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={loginStyles.loginMainContainerStyles}>
                <View style={loginStyles.logoContainerStyles}>
                    <Image source={require('../../images/logo.jpeg')} style={{width: 288, height: 87}}/>
                </View>
                                       
                    <View style={loginStyles.inputContainerStyles}>
                        <Text style={loginStyles.loginTextStyles}>Login</Text>
                        <TextInputComponent
                            iconSource={require('../../images/user.png')}
                            iconWidth={52} iconHeight={52} inputPlaceHolder={'Username'}
                            isPassword={false}
                            onTextInputSubmit={this.onUserNameChanged}
                            defaultValue={this.state.username}
                        />
                        <TextInputComponent
                            iconSource={require('../../images/password.png')}
                            iconWidth={52} iconHeight={52} inputPlaceHolder={'Password'}
                            isPassword={true}
                            onTextInputSubmit={this.onPasswordChanged}
                            defaultValue={this.state.password}
                        />
                        <TouchableOpacity style={loginStyles.loginButtonContainer} onPress={this.onLoginClicked} > 
                            <Image source={require('../../images/loginbutton.png')} style={loginStyles.loginButtonStyles}/>
                        </TouchableOpacity>
                        <View><Text style={loginStyles.loginInvalidUserMsg}>{this.state.errorMsg}</Text></View>
                    </View>
               
                <View style={loginStyles.bottomContainerStyles}/>
            </View>
        )
    }
};

import { connect } from 'react-redux';
function mapStateToProps(state) {
    return {
        authState: state.authState
    }
}

export const actionCreator = (type, payload = null) => ({ type, payload })

function mapDispatchToProps(dispatch) {
    return {
        authSuccess: (token, userFullName = '') => {
            AsyncStorage.multiSet([['token', token], ['authenticated', '1']]);
            dispatch( loginSuccess(userFullName, token) );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)