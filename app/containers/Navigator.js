import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../components/Login/Login';
import DrawerNavigator from './DrawerNavigator';

const MainNavigator = createStackNavigator({
  Login: { screen: Login,
    navigationOptions:{
      title:null,
      headerLeft: null,
      headerStyle: {  maxHeight: 0, backgroundColor: 'white', height: 50 }
    }
  },
  DashboardDrawerNavigator: { screen: DrawerNavigator,
    navigationOptions:{
      title: null,
      headerLeft: null,
      headerStyle: {  maxHeight: 0, backgroundColor: 'white', height: 0 }
    }
  }
},  {
      defaultNavigationOptions: {
        headerStyle: { maxHeight: 35 }
      },
      initialRouteName:'Login'
    }
);

const mainNavigator = createAppContainer(MainNavigator);

export default mainNavigator;