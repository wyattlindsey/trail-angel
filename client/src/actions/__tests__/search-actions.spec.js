'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

import searchActions from '../search-actions';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';
import homeData from '../../../__tests__/fixtures/home-data';
const id = homeData[0].id;

const mockStore = configureStore(middlewares);
const store = mockStore({
  listingsReducer: {
    id: {
      ...homeData[0]
    }
  }
});

jest.unmock('../favorite-actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.mock('../../api/google-places-api', () => {
  const actionTypes = require('../action-types').default;
  const searchResultsSimple = require('../../../__tests__/fixtures/search-results-simple').default;
  const searchResultsDetailed = require('../../../__tests__/fixtures/search-results-detailed').default;
  return {
    search: () => {
      return Promise.resolve(searchResultsSimple);
    },

    fetchDetails: () => {
      return Promise.resolve(searchResultsDetailed);
    },

    getUrlForPhoto: () => {
      return Promise.resolve('urlstring');
    }
  };
});

describe('search actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('searches for listings', () => {
    return store.dispatch(searchActions.search('', {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    }))
      .then((results) => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(results).toMatchSnapshot();
      });
  });

  it('gets details for listings', () => {
    return store.dispatch(searchActions.search('mountain', {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    }))
      .then((results) => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(results).toMatchSnapshot();
      });
  });
});