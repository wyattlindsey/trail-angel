'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import appActions from '../app-actions';
import position from '../../../__tests__/fixtures/geolocation-data';
import profileData from '../../../__tests__/fixtures/profile-data';

const mockStore = configureStore(middlewares);
const store = mockStore({
  userReducer: {
    userId: 123
  },

  appReducer: {
    geolocation: position
  }
});

global.navigator = {
  geolocation: {
    getCurrentPosition: jest.fn((resolve) => {
      return resolve(position);
    })
  }
};

jest.unmock('../app-actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.mock('../../utils/request', () => {
  return {
    get: jest.fn(() => {
      return Promise.resolve();
    })
  };
});

jest.mock('../search-actions', () => {
  const homeData = require('../../../__tests__/fixtures/home-data').default;
  return {
    search: jest.fn(() => {
      return {
        type: 'RECEIVE_SEARCH_RESULTS',
        searchResults: homeData
      };
    }),

    getDetails: jest.fn(() => {
      return {
        type: 'RECEIVE_SEARCH_RESULTS',
        searchResults: homeData
      };
    })
  };
});

describe('app actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    store.clearActions();
    mockAsyncStorage.release();
  });

  it('gets geolocation data', () => {
    return store.dispatch(appActions.getGeolocation())
      .then((results) => {
        const actions = store.getActions();

        expect(navigator.geolocation.getCurrentPosition).toBeCalled();

        expect(actions.length).toBe(2);
        expect(actions[0]).toEqual({ type: 'GET_GEOLOCATION' });
        expect(actions[1]).toEqual(
          {
            type: 'RECEIVE_GEOLOCATION',
            geolocation: position
          });

        expect(results).toMatchSnapshot();
      });
  });

  it('initializes the app', () => {
    return store.dispatch(appActions.initializeApp(profileData))
      .then((results) => {
        const actions = store.getActions();
        const actionTypeSequence = actions.map(a => a.type);
        expect(actions.length).toBe(10);
        expect(actionTypeSequence).toEqual(
          [ 'INITIALIZE_APP',
            'RECEIVE_USER_DATA',
            'GET_GEOLOCATION',
            'RECEIVE_GEOLOCATION',
            'CLEAR_ALL_FROM_STORAGE',
            'LOAD_LISTINGS_FROM_STORAGE',
            'RECEIVE_SEARCH_RESULTS',
            'LOAD_HOME_DATA',
            'RECEIVE_SEARCH_RESULTS',
            'LOAD_FAVORITES'
          ]
        );
        expect(results).toMatchSnapshot();
      })
  });
});

