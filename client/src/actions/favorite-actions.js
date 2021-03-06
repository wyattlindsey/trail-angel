'use strict';

import actionTypes from './action-types';
import dataApi from '../api';
import searchActions from '../actions/search-actions';

const favoriteActions = {
  loadFavorites: () => {
    return (dispatch, getState) => {
      dispatch({
        type: actionTypes.FETCH_FAVORITES
      });

      return dataApi.trailAngelApi.getFavorites(getState().userReducer.userId)
        .then((favoriteIDs) => {
          return dispatch(searchActions.getDetails(favoriteIDs));
        })
        .then((favorites) => {
          dispatch({
            type: actionTypes.RECEIVE_FAVORITES,
            favorites
          });
          return favorites;
      });
    };
  },

  addFavorite: (id) => {
    return (dispatch, getState) => {
      return dataApi.trailAngelApi.addFavorite(getState().userReducer.userId, id)
        .then(() => {
          return dispatch({
            type: actionTypes.ADD_FAVORITE,
            id
          });
        });
    };
  },

  removeFavorite: (id) => {
    return (dispatch, getState) => {
      return dataApi.trailAngelApi.removeFavorite(getState().userReducer.userId, id)
        .then(() => {
          return dispatch({
            type: actionTypes.REMOVE_FAVORITE,
            id
          });
        });
    };
  }
};

export default favoriteActions;