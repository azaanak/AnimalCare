import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import RootReducer from './app/reducers/RootReducer';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['ViewPagerAndroid']);
YellowBox.ignoreWarnings(['Slider']);
YellowBox.ignoreWarnings(['Async Storage']);

const store = createStore(RootReducer);
const MainApp = () => (<Provider store={store}><App/></Provider>)

AppRegistry.registerComponent(appName, () => MainApp);
