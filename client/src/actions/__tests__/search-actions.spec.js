'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

import searchActions from '../search-actions';
import googlePlaces from '../../api/google-places-api';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';
import searchResultsDetailed from '../../../__tests__/fixtures/search-results-detailed';

const mockStore = configureStore(middlewares);
const store = mockStore({
  listingsReducer: {
    cache: {
      // fresh listing
      [searchResultsDetailed[0].id]: {
        cacheTimestamp: Date.now(),
        ...searchResultsDetailed[0],
      },

      // stale listing
      [searchResultsDetailed[1].id]: {
        cacheTimestamp: Date.now() - 1209700000,
        ...searchResultsDetailed[1]
      }
    }
  }
});

jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.unmock('../favorite-actions');

jest.mock('../../utils/request', () => {
  return {
    get: () => {
      return Promise.resolve();
    }
  };
});

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

describe('search actions', () => {
  afterEach(() => {
    store.clearActions();
    googlePlaces.fetchDetails.mockClear();
  });

  it('searches for listings', () => {
    return store.dispatch(searchActions.search('mountain', {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    }))
      .then((results) => {

        const actions = store.getActions();
        expect(actions[0]).toEqual({type: 'SUBMIT_SEARCH'});

        expect(googlePlaces.search).toBeCalledWith({
          query: 'mountain',
          latitude: geolocationData.coords.latitude,
          longitude: geolocationData.coords.longitude
        });
      });
  });

  it('gets details for listings', () => {
    return store.dispatch(searchActions.search('mountain', {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    }))
      .then((results) => {
        // The number of calls to fetchDetails should only
        // include needed requests for listings not yet
        // in the cache, but not include expired cache listings,
        // so we only have one listing that is really a cache hit.
        expect(googlePlaces.fetchDetails.mock.calls.length)
          .toBe(results.searchResults.length - 1);

        const actions = store.getActions();
        expect(actions.length).toBe(3);

        // verify that action to remove stale listing is dispatched
        expect(actions[1]).toEqual(
          {
            id: searchResultsDetailed[1].id,
            type: 'REMOVE_FROM_STORAGE'
          });
      });
  });

  it('cancels the search request', () => {
    return store.dispatch(searchActions.cancelRequest())
      .then(() => {
        const actions = store.getActions();
        expect(actions.length).toBe(2);
        expect(actions[0]).toEqual({type: 'CANCEL_REQUEST'});
        expect(actions[1]).toEqual(
          {
            searchResults: [],
            type: 'RECEIVE_SEARCH_RESULTS'
          });
      });
  })
});