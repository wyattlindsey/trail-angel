import actionTypes from './action-types';
import dataApi from '../api';

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

export const fetchFavorites = (userId) => {
  return (dispatch) => {
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
            });
        } // else Promise.reject()?
      });
  };
};

export const addFavorite = (userId, itemId) => {
  return (dispatch) => {
    return data.trailAngelApi.addFavorite(userId, itemId)
      .then(() => {
        dispatch({
          type: actions.ADD_FAVORITE,
          userId,
          itemId
        });
      });
  };
};

export const removeFavorite = (userId, itemId) => {
  return {
    type: actions.REMOVE_FAVORITE,
    userId,
    itemId
  };
};