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

export const search = (options) => {
  return (dispatch) => {
    dispatch(submitSearch(options));
    return dataApi.yelp(options)
      .then((json) => {
        return dispatch(receiveSearchResults(json));
      })
      .catch((err) => {
        console.error('error retrieving search data', err);
      });
  }
};