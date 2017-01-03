'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  items: []
}

export default function favoritesReducer(state = initialState, action = {}) {
  switch(action.type) {
    case actionTypes.REQUEST_FAVORITES:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECEIVE_FAVORITES:
      return {
        ...state,
        isFetching: false,
        items: action.items
      };
    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        items: state.items.push(action.item)
      };
    case actionTypes.REMOVE_FAVORITE:
      const index = state.items.findIndex(action.item);
      const arr = state.items.slice();
      arr.splice(index, 1)

      return {
        ...state,
        items: arr
      };
    default:
      return state;
  }
};