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
  searchResults: [],   // todo convert this to a collection
  homeData: [],
  favorites:[]
};

const listingsReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case actionTypes.FETCH_LISTINGS:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.SUBMIT_SEARCH:
      return {
        ...state,
        searchResults: [],
        isFetching: true,
        isFetchCancelled: false
      };

    case actionTypes.RECEIVE_SEARCH_RESULTS:
      let obj = {};
      action.searchResults.forEach((result) => {
        obj[result.id] = result;
      });

      return {
        ...state,
        cache: {
          ...state.cache,
          ...obj
        },
        searchResults: action.searchResults,
        isFetching: false,
        isFetchCancelled: false
      };

    case actionTypes.CANCEL_REQUEST:
      return {
        ...state,
        searchResults: [],
        isFetching: false,
        isFetchCancelled: true
      };

    case actionTypes.LOAD_HOME_DATA:
      return {
        ...state,
        searchResults: [],
        homeData: action.data
      };

    case actionTypes.LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.favorites
      };

    case actionTypes.ADD_FAVORITE:
      const favorite = state.cache[action.id];
      if (!favorite) {
        return state;
      }
      return {...state,
        favorites: [
          ...state.favorites,
          favorite
        ]};

    case actionTypes.REMOVE_FAVORITE:
      const indexToRemove = _.findIndex(state.favorites, {id: action.id});
      if (indexToRemove === -1) {
        return state;
      }
      let favorites = [...state.favorites];
      favorites.splice(indexToRemove, 1);
      return {
        ...state,
        favorites
      };

    case actionTypes.STORE_LISTING:
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.listing
        }
      }

    case actionTypes.LOAD_SAVED_LISTINGS:
      return {
        ...state,
        cache: action.loadedListings || {}
      };

    case actionTypes.LOAD_SAVED_SEARCHES:
      return {
        ...state,
        searches: action.loadedSearches
      };

    case actionTypes.LOAD_SAVED_COLLECTIONS:
      return {
        ...state,
        collections: {    // todo make sure there's something here to load
          ...state.collections,
          favorites: [],
          home: [],
          search: [],
          ...action.loadedCollections,
        }
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
      return {
        ...state,
        collections: {
          ...state.collections,
          [action.name]: action.collection
        }
      };

    case actionTypes.RECEIVE_LISTINGS:
      let cache = {}, searches, collections;
      if (action.collection) {
        collections = {
          ...state.collections,
          [action.collection]: action.searchResults
        }
      }

      // todo make sure to clear this if the search line clears
      const searchResults = action.collection === 'search' ? action.searchResults : state.searchResults

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
          searchResults,
          cache,
          searches
        };

      } else {
        cache = state.cache;
        searches = false;

        return {
          ...state,
          isFetching: false,
          isFetchCancelled: false,
          searchResults,
          cache
        };
      };

    default: {
      return state;
    }
  }
};

export default listingsReducer;