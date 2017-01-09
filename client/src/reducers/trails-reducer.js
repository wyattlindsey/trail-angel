'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  trails: []
}

export default function trailsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.REQUEST_TRAILS:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.RECEIVE_TRAILS:

      return {
        ...state,
        isFetching: false,
        trails: action.trails,
      }
    default:
      return state;
  }
};