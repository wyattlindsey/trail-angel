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
    getFavorites: jest.fn(() => {
      const homeData = require('../../../__tests__/fixtures/home-data').default;
      const IDs = homeData.map((item) => item.id);
      return Promise.resolve(IDs);
    }),

    addFavorite: jest.fn(() => {
      return Promise.resolve();
    }),

    removeFavorite: jest.fn(() => {
      return Promise.resolve();
    })
  };
});

import trailAngelApi from '../../api/trailangel-api';

jest.mock('../search-actions', () => {
  const actionTypes = require('../action-types').default;
  const homeData = require('../../../__tests__/fixtures/home-data').default;
  return {
    getDetails: jest.fn(() => {
      return {
        type: 'LOAD_FAVORITES',
        favorites: homeData
      };
    })
  };
});

import searchActions from '../search-actions';

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
        const actions = store.getActions();
        const homeData = require('../../../__tests__/fixtures/home-data').default;
        const IDs = homeData.map((item) => item.id);

        expect(trailAngelApi.getFavorites).toBeCalled();
        expect(searchActions.getDetails).toBeCalledWith(IDs);

        expect(actions.length).toBe(2);
        expect(actions[0]).toEqual(
          {
            type: 'LOAD_FAVORITES',
            favorites: homeData
          }
        );
        expect(result).toMatchSnapshot();
      });
  });

  it('should remove favorite', () => {
    return store.dispatch(favoriteActions.addFavorite(456))
      .then((result) => {
        const actions = store.getActions();

        expect(trailAngelApi.addFavorite)
          .toBeCalledWith(store.getState().userReducer.userId, 456);

        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(
          {
            type: 'ADD_FAVORITE',
            id: 456
          }
        );

        expect(result).toMatchSnapshot();
      });
  });

  it('should remove favorite', () => {
    return store.dispatch(favoriteActions.removeFavorite(456))
      .then((result) => {
        const actions = store.getActions();

        expect(trailAngelApi.removeFavorite)
          .toBeCalledWith(store.getState().userReducer.userId, 456);

        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(
          {
            type: 'REMOVE_FAVORITE',
            id: 456
          }
        );

        expect(result).toMatchSnapshot();
      });
  });
});