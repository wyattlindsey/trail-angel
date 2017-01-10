'use strict';

import React, { Component } from 'react';
import { View, NavigatorIOS, StyleSheet } from 'react-native';

import TrailAngel from './trail-angel';
import Login from '../components/auth/login.component';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from '../reducers';

const logger = createLogger();    // todo: need to disable this for production builds
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
      <NavigatorIOS ref="nav"
                    style={styles.container}
                    initialRoute={{
                      component: Login,
                      title: 'Welcome to TrailAngel'
                    }}
      />
      </Provider>
    );
  }
};

//<TrailAngel profile={this.props.profile} />

let styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#111111'
      }
});