import * as _ from 'lodash';

import actionTypes from './action-types';
import dataApi from '../api';

const submitSearch = (term) => {
  return {
    type: actionTypes.SUBMIT_SEARCH,
    term
  };
};

const receiveSearchResults = (results) => {
  return {
    type: actionTypes.RECEIVE_SEARCH_RESULTS,
    results: results
  };
};

// mutates the trail to include a isFavorite flag
const associateFavorites = (trails, favorites) => {
  _.map(trails, (trail) => {
    trail.isFavorite = _.findIndex(favorites, { id: trail.id }) !== -1;
    trail.isSearchResult = true;
  });
};

export const cancelSearch = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CANCEL_SEARCH
    });
    dispatch(receiveSearchResults([]));
  };
}

export const search = (options) => {
  return (dispatch, getState) => {
    if (!getState().searchReducer.isCancelled) {
      dispatch(submitSearch(options));
      return dataApi.googlePlaces.search(options)
        .then((results) => {
          associateFavorites(results, getState().favoritesReducer.favorites);
          return dispatch(receiveSearchResults(results));
        })
        .catch((err) => {
          console.error('error retrieving search data', err);
        });
    }
  };
};