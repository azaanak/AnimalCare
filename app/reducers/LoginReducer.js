import { Constants } from '../resources/constants/Constants';
import { InitialState } from './InitialState';
import { LogsInfo } from '../components/Utils/LogsInfo';

export default function (state = InitialState.loginState, action) {
    LogsInfo('LoginReducer function processing. ==>'+action.type);
    switch (action.type) {
        case Constants.actionTypes.LOGIN_SUCCESS:
            return{
                authenticated: true,
                fullName: action.loginUserFullName
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
