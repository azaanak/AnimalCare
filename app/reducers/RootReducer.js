import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
const RootReducer = combineReducers({
	authState:LoginReducer
});

export default RootReducer;
