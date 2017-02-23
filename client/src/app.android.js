'use strict';

import React, { Component } from 'react';
import { View, Navigator, StyleSheet } from 'react-native';

import Login from './views/login';
import colors from './components/style/colors';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

const logger = createLogger();
const middleware = [
  thunk,
  __DEV__ && logger
].filter(Boolean);
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {


  render() {
    return (
      <Provider store={store}>
        <Navigator initialRoute={{
                     title: 'Welcome to TrailAngel',
                     index: 0
                   }}
        />
      </Provider>
    );
  }
};

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.seafoam
  }
});