'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  isFetchCancelled: false,
  listings: [],
  searches: {}
};

const listingsReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case actionTypes.FETCH_LISTINGS:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.CANCEL_REQUEST:
      return {
        ...state,
        isFetching: false,
        isFetchCancelled: true
      };

    case actionTypes.RECEIVE_LISTINGS:
      return {
        ...state,
        isFetching: false,
        isFetchCancelled: false,
        listings: [
          ...state.listings,
          ...action.listings
        ],
        searches: {
          ...state.searches,
          ...action.search
        }
      };

    default: {
      return state;
    }
  }
};