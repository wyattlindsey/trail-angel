'use strict';
import * as _ from 'lodash';

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
        favorites: action.favorites
      };
    case actionTypes.ADD_FAVORITE:
      const favoritesCopy = state.favorites.slice();
      return {
        ...state,
        favorites: favoritesCopy.push({
          userId: action.userId,
          trailId: action.trailId
        })
      };
    case actionTypes.REMOVE_FAVORITE:
      const index = _.findIndex(state.favorites, { id: action.trailId });
      if (index !== -1) {
        let copy = state.favorites.slice();
        if (copy.length > 1) {
          copy.splice(index, 1);
        } else {
          copy = [];
        }

        return {
          ...state,
          favorites: copy
        };
      } else {
        return {

        }
      }
    default:
      return state;
  }
};