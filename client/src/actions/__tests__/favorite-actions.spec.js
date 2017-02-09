'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import favoriteActions from '../favorite-actions';
import homeData from '../../../__tests__/fixtures/home-data';

const mockStore = configureStore(middlewares);

describe('user actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    mockStore.clearActions();
    mockAsyncStorage.release();
  });

  it('should dispatch login user action', () => {
    // mockStore.replaceReducer(() => { return {  } })
    return mockStore.dispatch(favoriteActions.loadFavorites(123))
      .then((result) => {
        expect(result).toMatchSnapshot();
      });
  });
});