'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  isFetching: false,
  favorites: []
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
        favorites: action.items
      };
    case actionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.push(action.item)
      };
    case actionTypes.REMOVE_FAVORITE:
      const index = state.favorites.findIndex(action.item);
      const copy = state.items.slice();
      copy.splice(index, 1)

      return {
        ...state,
        favorites: copy
      };
    default:
      return state;
  }
};