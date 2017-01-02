'use strict';

import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from '../reducers';
import TrailAngel from './trail-angel';
import Nav from '../components/common/nav.component';

const logger = createLogger();    // todo: need to disable this for production builds
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TrailAngel />
      </Provider>
    );
  }
};