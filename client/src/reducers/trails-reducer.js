'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  items: ['test1', 'test2']
}

export default function trailsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.INVALIDATE_TRAILS:
      return {
        ...state,
        didInvalidate: true
      }
    case actionTypes.REQUEST_TRAILS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case actionTypes.RECEIVE_TRAILS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.trails,
        lastUpdated: action.receivedAt
      }
    default:
      return state;
  }
};