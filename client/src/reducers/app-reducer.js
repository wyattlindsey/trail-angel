'use strict';

import * as actionTypes from '../actions/action-types';

const initialState = {
  isLoaded: false
}

export default function appReducer(state = initialState, action = {}) {
  debugger;
  switch (action.type) {
    case actionTypes.INITIALIZE_APP:
      return {
        ...state,
        isLoaded: true
      }
    default:
      return state;
  }
};