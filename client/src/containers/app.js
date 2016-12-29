'use strict';

import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import TrailAngel from './trail-angel';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <View>
        <Text>
          Hello, World!!
        </Text>
      </View>
    );
  }
};