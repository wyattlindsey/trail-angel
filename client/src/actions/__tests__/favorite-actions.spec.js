'use strict';

jest.unmock('../favorite-actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.mock('../../api/trailangel-api', () => {
  return {
    removeFavorite: () => {
      return Promise.resolve();
    },

    addFavorite: () => {
      return Promise.resolve();
    }
  };
});

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import favoriteActions from '../favorite-actions';
import homeData from '../../../__tests__/fixtures/home-data';

const mockStore = configureStore(middlewares);
const store = mockStore({
  userReducer: {
    userId: 123
  }
});

describe('user actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    store.clearActions();
    mockAsyncStorage.release();
  });

  it('should remove favorite', () => {

    return store.dispatch(favoriteActions.addFavorite(123))
      .then((result) => {
        expect(result).toMatchSnapshot();
      });
  });

  it('should remove favorite', () => {

    return store.dispatch(favoriteActions.removeFavorite(123))
      .then((result) => {
        expect(result).toMatchSnapshot();
      });
  });
});