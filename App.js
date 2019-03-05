/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

var CompanyLoginView = require('./pages/companyLoginView')
var UserLoginView = require('./pages/userLoginView')
var MainView = require('./pages/mainView')
var TestView = require('./pages/testView')
var AuthView = require('./pages/authLoadingView')
var NewsDetailView = require('./pages/newsDetailView')
var OrderDetailView = require('./pages/orderDetailView')


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const AppStack = createStackNavigator(
  {
    // CompanyLogin: CompanyLoginView,
    // UserLogin: UserLoginView,
    Main: MainView,
    NewsDetail: NewsDetailView,
    OrderDetail: OrderDetailView,
    Test: TestView,
  },
  {
    //  initialRouteName: 'CompanyLogin',
    //  initialRouteName: 'Test',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#1B82D2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);
const AuthStack = createStackNavigator({
  CompanyLogin: CompanyLoginView,
  UserLogin: UserLoginView,
});

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthView,
    App: AppStack,
    Auth: AuthStack,
    Test: TestView,
  },
  {
    initialRouteName: 'AuthLoading',
    //  initialRouteName: 'Test',
  }
));

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}
