'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

import actionTypes from '../action-types';
import searchActions from '../search-actions';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';
import searchResultsSimple from '../../../__tests__/fixtures/search-results-simple';
import searchResultsDetailed from '../../../__tests__/fixtures/search-results-detailed';

const id = searchResultsDetailed[0].id;

const mockStore = configureStore(middlewares);
const store = mockStore({
  listingsReducer: {
    cache: {
      [id]: {
        ...searchResultsDetailed[0]
      }
    }
  }
});

jest.unmock('../favorite-actions');
jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.mock('../../utils/request', () => {
  return {
    get: () => {
      return Promise.resolve();
    }
  };
});


// let googlePlaces = jest.genMockFromModule('../../api/google-places-api').default;

jest.mock('../../api/google-places-api', () => {
  const searchResultsSimple =
    require('../../../__tests__/fixtures/search-results-simple').default;
  const searchResultsDetailed =
    require('../../../__tests__/fixtures/search-results-detailed').default;

  return {
    search: jest.fn(() => {
      return Promise.resolve(searchResultsSimple);
    }),

    fetchDetails: jest.fn(() => {
      return Promise.resolve(searchResultsDetailed);
    }),

    getUrlForPhoto: jest.fn(() => {
      return Promise.resolve('someUrlString');
    })
  };


});

import googlePlaces from '../../api/google-places-api';

describe('search actions', () => {
  afterEach(() => {
    store.clearActions();
  });

  it('searches for listings', () => {
    return store.dispatch(searchActions.search('mountain', {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    }))
      .then((results) => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);

        expect(googlePlaces.search).toBeCalledWith({
          query: 'mountain',
          latitude: geolocationData.coords.latitude,
          longitude: geolocationData.coords.longitude
        });

        expect(results).toMatchSnapshot();
      });
  });

  it('gets details for listings', () => {
    googlePlaces.fetchDetails.mockClear();

    return store.dispatch(searchActions.search('mountain', {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    }))
      .then((results) => {
        // the number of calls to fetchDetails should only
        // include needed requests for listings not yet
        // in the cache
        expect(googlePlaces.fetchDetails.mock.calls.length)
          .toBe(results.searchResults.length
            - Object.keys(store.getState().listingsReducer.cache).length);
      });
  });
});