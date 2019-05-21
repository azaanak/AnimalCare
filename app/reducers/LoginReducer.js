import { Constants } from '../resources/constants/Constants';
import { InitialState } from './InitialState';

export default function (state = InitialState.loginState, action) {
    switch (action.type) {
        case Constants.actionTypes.LOGIN_SUCCESS:
            return{
                authenticated: true,
                fullName: action.loginUserFullName,
                token: action.token
            }
        case Constants.actionTypes.LOGOUT:
            return {
                authenticated:false,
                fullName: ''
            }
        default:
            return state
    }
}
