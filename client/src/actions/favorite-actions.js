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
            const cachedTrail = _.find(getState().trailsReducer.trails, { id: item });
            if (cachedTrail !== undefined) {
              return Promise.resolve(cachedTrail);
            } else {
              return dataApi.yelp({ id: item });
            }
          });

          return Promise.all(promises)
            .then((results) => {
              return dispatch(receiveFavorites(results));
            })
            .catch((err) => {
              console.error(err);
            });
        } // else Promise.reject()?
      });
  };
};

// todo this is copy-pasta from trails-reducer: factor it out
const associateFavorites = (trails, favorite) => {
  return _.map(trails, (trail) => {
    trail.isFavorite = _.findIndex(favorite, { id: trail.id }) !== -1;
  });
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
        return dispatch({
          type: actionTypes.ADD_FAVORITE,
          userId,
          trailId
        });
      })
      .then((data) => {
        dispatch({
          type: actionTypes.UPDATE_TRAIL,
          trailId: data.trailId,
          attribute: 'isFavorite',
          newValue: true
        });
      });
  };
};

export const removeFavorite = (trailId) => {
  return (dispatch, getState) => {
    const userId = getState().userReducer.userId;
    return dataApi.trailAngelApi.removeFavorite(userId, trailId)
      .then(() => {
        return dispatch({
          type: actionTypes.REMOVE_FAVORITE,
          trailId
        });
      })
      .then((data) => {
        dispatch({
          type: actionTypes.UPDATE_TRAIL,
          trailId: data.trailId,
          attribute: 'isFavorite',
          newValue: false
        });
      });
  };
};