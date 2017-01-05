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

export const search = (term) => {
  return (dispatch) => {
    dispatch(submitSearch(term));

    return dataApi.yelp({term})
      .then((json) => {
        return dispatch(receiveSearchResults(json));
      });
  }
};