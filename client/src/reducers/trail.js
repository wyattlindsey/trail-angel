'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  lastUpdated: null,
  trails: []
}

export default function trails(state = initialState, action = {}) {
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
        trails: action.trails,
        lastUpdated: action.receivedAt
      }
    default:
      return state;
  }
};