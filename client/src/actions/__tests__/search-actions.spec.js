'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];

import searchActions from '../search-actions';
import googlePlaces from '../../api/google-places-api';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';
import placeResultsDetailed from '../../../__tests__/fixtures/place-results-detailed';

const mockStore = configureStore(middlewares);
const store = mockStore({
  listingsReducer: {
    cache: {
      // fresh listing
      [placeResultsDetailed[0].id]: {
        cacheTimestamp: Date.now(),
        ...placeResultsDetailed[0],
      },

      // stale listing
      [placeResultsDetailed[1].id]: {
        cacheTimestamp: Date.now() - 1209700000,
        ...placeResultsDetailed[1]
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
  const placeResultsSimple =
    require('../../../__tests__/fixtures/place-results-simple').default;
  const placeResultsDetailed =
    require('../../../__tests__/fixtures/place-results-detailed').default;

  return {
    search: jest.fn(() => {
      return Promise.resolve(placeResultsSimple);
    }),

    fetchDetails: jest.fn(() => {
      return Promise.resolve(placeResultsDetailed);
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
            id: placeResultsDetailed[1].id,
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