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
      return dataApi.yelp(options)
        .then((json) => {
          return dispatch(receiveSearchResults(json));
        })
        .catch((err) => {
          console.error('error retrieving search data', err);
        });
    }
  };
};