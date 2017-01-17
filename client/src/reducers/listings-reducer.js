'use strict';

import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  isFetchCancelled: false,
  cache: {},
  collections: {},
  searches: {},
  searchResults: []   // todo convert this to a collection
};

const listingsReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case actionTypes.FETCH_LISTINGS:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.CANCEL_REQUEST:
      return {
        ...state,
        isFetching: false,
        isFetchCancelled: true
      };

    case actionTypes.LOAD_SAVED_LISTINGS:
      return {
        ...state,
        cache: action.loadedListings || {}
      };

    case actionTypes.LOAD_SAVED_SEARCHES:
      return {
        ...state,
        searches: action.loadedSearches
      }

    case actionTypes.LOAD_SAVED_COLLECTIONS:
      return {
        ...state,
        // collections: action.loadedCollections    // todo make sure there's something here to load
      };

    case actionTypes.UPDATE_LISTINGS:
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.updatedListings
        }
      };

    case actionTypes.UPDATE_COLLECTION:
      debugger;
      return {
        ...state,
        // collection[action.name]: action.collection
      };

    case actionTypes.RECEIVE_LISTINGS:
      let cache = {}, searches, collections;
      if (action.collection) {
        collections = {
          ...state.collections,
          [action.collection]: action.searchResults
        }
      }

      // actions.searchToSave is a boolean set to true if this set of results should be
      // persisted to the cache under those particular search options
      if (action.searchToSave) {
        _.each(action.searchResults, (result) => {
          if (state.cache[result.id] === undefined) {
            cache[[result.id]] = result;
          }
        });

        cache = {
          ...state.cache,
          ...cache
        }

        searches = {
          ...state.searches,
          [action.searchToSave.search]: {
            search: action.searchToSave.search,
            results: action.searchToSave.results
          }
        };

        return {
          ...state,
          isFetching: false,
          isFetchCancelled: false,
          searchResults: action.searchResults,
          cache,
          searches,
          collections
        };

      } else {
        cache = state.cache;
        searches = false;

        return {
          ...state,
          isFetching: false,
          isFetchCancelled: false,
          searchResults: action.searchResults,
          cache,
          collections
        };
      };

    default: {
      return state;
    }
  }
};

export default listingsReducer;