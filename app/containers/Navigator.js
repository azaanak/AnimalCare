import {createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../components/Login/Login';
import Dashboard from '../components/Dashboard/Dashboard';

const MainNavigator = createStackNavigator({
  Login: { screen: Login,
    navigationOptions:{
      title:'Login',
      headerLeft: null
    }
  },
  Dashboard: { screen: Dashboard,
    navigationOptions:{
      title:'Dashboard',
      headerLeft: null
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