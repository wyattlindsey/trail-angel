import actionTypes from './action-types';
import dataApi from '../api';
import * as _ from 'lodash';

const requestFavorites = (userId) => {
  return {
    type: actionTypes.REQUEST_FAVORITES,
    userId
  };
};

const receiveFavorites = (favorites) => {
  return {
    type: actionTypes.RECEIVE_FAVORITES,
    favorites
  };
};

export const fetchFavorites = () => {
  return (dispatch, getState) => {
    const userId = getState().userReducer.userId;
    dispatch(requestFavorites(userId));

    // get favorites for user from the server
    return dataApi.trailAngelApi.getFavorites(userId)
      .then((data) => {
        if (data !== undefined && Array.isArray(data)) {
          let promises = data.map((item) => {
            // todo: check to see if the favorite is already in trailsReducer.trails
            // todo: can this just use existing functionality in trail-actions.js?
            // todo: for now, just pull directly from yelp
            return dataApi.yelp({ id: item });
          });

          return Promise.all(promises)
            .then((results) => {
              return dispatch(receiveFavorites(results));
            })
            .catch((err) => {
              console.log(err);
            });
        } // else Promise.reject()?
      });
  };
};

export const addFavorite = (trailId) => {
  return (dispatch, getState) => {
    const userId = getState().userReducer.userId;
    const favorites = getState().favoritesReducer.favorites;
    if (_.findIndex(favorites, { id: trailId }) !== -1) {
      return;
    }
    return dataApi.trailAngelApi.addFavorite(userId, trailId)
      .then(() => {
        dispatch({
          type: actionTypes.ADD_FAVORITE,
          userId,
          trailId
        });
      })
      .then((favorites) => {
        const receiveFavorites = (favorites) => {
          return {
            type: actionTypes.RECEIVE_FAVORITES,
            favorites
          };
        };
      });
  };
};

export const removeFavorite = (trailId) => {
  return (dispatch, getState) => {
    userId = getState().userReducer.userId;
    return dataApi.trailAngelApi.removeFavorite(userId, trailId)
      .then(() => {
        dispatch({
          type: actionTypes.REMOVE_FAVORITE,
          userId,
          trailId
        })
      .then((favorites) => {
        const receiveFavorites = (favorites) => {
          return {
            type: actionTypes.RECEIVE_FAVORITES,
            favorites
          };
        };
      });
    });
  };
};