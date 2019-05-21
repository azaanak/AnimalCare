import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import NavigatorReducer from './NavigatorReducer';
import WorkOrderReducer from './WorkOrderReducer';
const RootReducer = combineReducers({
	authState:LoginReducer,
	navState:NavigatorReducer,
	workOrderState:WorkOrderReducer
});

export default RootReducer;
