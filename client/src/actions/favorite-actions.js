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
    // todo cancel this if everything is cached so spinner doesn't appear on cache hit
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
              console.error('error fetching favorites', err);
            });
        } // else Promise.reject()?
      });
  };
};

export const addFavorite = (trailId) => {
  return (dispatch, getState) => {
    const userId = getState().userReducer.userId;
    return dataApi.trailAngelApi.addFavorite(userId, trailId)
      .then(() => {
        let trail = _.find(getState().trailsReducer.trails, {id: trailId});
        // todo check for undefined
        return dispatch({
          type: actionTypes.ADD_FAVORITE,
          trailData: trail
        });
      })
      .then((data) => {
        return dispatch({
          type: actionTypes.UPDATE_TRAIL,
          trailId: data.trailData.id,
          attribute: 'isFavorite',
          newValue: true
        });
      })
      .catch((err) => {
        console.error('error adding favorite', err);
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
        return dispatch({
          type: actionTypes.UPDATE_TRAIL,
          trailId: data.trailId,
          attribute: 'isFavorite',
          newValue: false
        });
      })
      .catch((err) => {
        console.error('error removing favorite', err);
      });
  };
};