'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import favoriteActions from '../favorite-actions';

const mockStore = configureStore(middlewares);
const store = mockStore({
  userReducer: {
    userId: 123
  }
});

jest.unmock('../favorite-actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.mock('../../api/trailangel-api', () => {
  return {
    getFavorites: () => {
      return new Promise((resolve) => {
        return resolve();
      });
    },

    addFavorite: () => {
      return Promise.resolve();
    },

    removeFavorite: () => {
      return Promise.resolve();
    }
  };
});

jest.mock('../search-actions', () => {
  const actionTypes = require('../action-types').default;
  const homeData = require('../../../__tests__/fixtures/home-data').default;
  return {
    getDetails: () => {
      return {
        type: actionTypes.LOAD_FAVORITES,
        favorites: homeData.slice(0, 3)
      };
    }
  };
});

describe('user actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    store.clearActions();
    mockAsyncStorage.release();
  });

  it('loads favorites', () => {
    return store.dispatch(favoriteActions.loadFavorites())
      .then((result) => {
        expect(result).toMatchSnapshot();
      });
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