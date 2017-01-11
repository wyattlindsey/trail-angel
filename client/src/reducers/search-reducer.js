'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  isCancelled: false,
  results: []
}

export default function searchReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.RECEIVE_SEARCH_RESULTS:
      return {
        ...state,
        isFetching: false,
        isCancelled: false,
        results: state.isCancelled? [] : action.results
      };
    case actionTypes.SUBMIT_SEARCH:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.CANCEL_SEARCH:
      return {
        ...state,
        isCancelled: true
      }
    default:
      return state;
  }
};