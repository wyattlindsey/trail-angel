'use strict';

import actionTypes from '../actions/action-types';

let initialState = {
  isLoaded: false,
  geolocation: null,
  gettingLocation: false
};

export default function appReducer(state = initialState, action = {}) {
  switch(action.type) {
    case actionTypes.INITIALIZE_APP:
      return {
        ...state,
        isLoaded: true
      };
    case actionTypes.GET_GEOLOCATION:
      return {
        ...state,
        gettingLocation: true
      };
    case actionTypes.RECEIVE_GEOLOCATION:
      return {
        ...state,
        geolocation: action.geolocation,
        gettingLocation: false
      };
    default:
      return state;
  }
};