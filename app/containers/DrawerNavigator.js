import React from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import WorkordersScreen from '../components/Workorders/Workorders';
import TasksScreen from '../components/Tasks/Tasks';
import TaskFormScreen from '../components/Tasks/TaskForm';
import SettingsScreen from '../components/Settings/Settings';
import LogoutScreen from '../components/Utils/Logout';
import MenuDrawer from '../components/Dashboard/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	initialRouteName: 'Workorders',
	drawerWidth: WIDTH*0.73,
	drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} SelectedScreen={SelectedScreen} />)
	}
}

const DrawerNavigator =  createDrawerNavigator({
	Workorders: {
		screen: WorkordersScreen
	},
	Tasks: {
		screen: TasksScreen
	},
	TaskForm: {
		screen: TaskFormScreen
	},
	Settings: {
		screen: SettingsScreen
	},
	Logout: {
		screen: LogoutScreen
	},
},
	DrawerConfig
);

let SelectedScreen = '';
const defaultGetStateForAction = DrawerNavigator.router.getStateForAction;
DrawerNavigator.router.getStateForAction = (action, state) => {
	if(action.routeName != null){
		SelectedScreen = action.routeName;
	}
    return defaultGetStateForAction(action, state);
};

export default createAppContainer(DrawerNavigator);