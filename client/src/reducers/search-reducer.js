'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  results: []
}

export default function searchReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: false,
        results: action.results.businesses
      }
    case actionTypes.SUBMIT_SEARCH:
      return {
        ...state,
        isFetching: true
      };
    default:
      return state;
  }
};