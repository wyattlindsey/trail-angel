'use strict';

import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  isFetchCancelled: false,
  cache: {},
  searchResults: [],
  homeData: [],
  favorites:[]
};

const listingsReducer = (state = initialState, action = {}) => {

  switch (action.type) {

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
      return {
        ...state,
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

    case actionTypes.SAVE_TO_STORAGE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.data.id]: action.data
        }
      };

    case actionTypes.REMOVE_FROM_STORAGE:
      const cacheCopy = { ...state.cache };
      delete cacheCopy[action.id];
      return {
        ...state,
        cache: cacheCopy
      };

    case actionTypes.LOAD_LISTINGS_FROM_STORAGE:
      return {
        ...state,
        cache: {
          ...state.cache,
          ...action.listings
        }
      };

    case actionTypes.CLEAR_ALL_FROM_STORAGE:
      return {
        ...state,
        cache: {}
      };

    default: {
      return state;
    }
  }
};

export default listingsReducer;