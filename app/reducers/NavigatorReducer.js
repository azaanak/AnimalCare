import { Constants } from '../resources/constants/Constants';
import { InitialState } from './InitialState';

export default function (state = InitialState.navigatorState, action) {
    switch (action.type) {
        case Constants.actionTypes.SELECTED_SCREEN:
            return{
                selectedScreen: action.selectedScreen
            }
        default:
            return state
    }
}
