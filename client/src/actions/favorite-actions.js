'use strict';

import actionTypes from './action-types';
import dataApi from '../api';
import searchActions from '../actions/search-actions';

const favoriteActions = {
  loadFavorites: () => {
    return (dispatch, getState) => {
      dataApi.trailAngelApi.getFavorites(getState().userReducer.userId)
        .then((favoriteIDs) => {
          return dispatch(searchActions.getDetails(favoriteIDs));
        })
        .then((favorites) => {
          dispatch({
            type: actionTypes.LOAD_FAVORITES,
            favorites
          });
          return favorites;
      });
    };
  },

  addFavorite: (id) => {
    return (dispatch, getState) => {
      dataApi.trailAngelApi.addFavorite(getState().userReducer.userId, id)
        .then(() => {
          dispatch({
            type: actionTypes.ADD_FAVORITE,
            id
          });
        });
    };
  },

  removeFavorite: (id) => {
    return (dispatch, getState) => {
      dataApi.trailAngelApi.removeFavorite(getState().userReducer.userId, id)
        .then(() => {
          dispatch({
            type: actionTypes.REMOVE_FAVORITE,
            id
          });
        });
    };
  }
};

export default favoriteActions;