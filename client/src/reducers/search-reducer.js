'use strict';
import * as _ from 'lodash';

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
    case actionTypes.UPDATE_SEARCH_RESULT:
      const updatedResult = _.find(state.results, { id: action.trailId });
      if (updatedResult === undefined) {
        return state;
      } else {
        updatedResult[action.attribute] = action.newValue;
        let results = state.results.slice();
        return {
          ...state,
          results
        }
      }
    default:
      return state;
  }
};