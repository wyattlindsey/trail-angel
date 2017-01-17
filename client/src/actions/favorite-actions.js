import actionTypes from './action-types';
import listingActions from './listing-actions';
import dataApi from '../api';
import * as _ from 'lodash';

const favoriteActions = {
  loadFavorites: () => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const userId = getState().userReducer.userId;

        dataApi.trailAngelApi.getFavorites(userId)
          .then((data) => {
            if (data === undefined) {
              console.error('No data retrieved from server');
              reject();

            } else if (Array.isArray(data)) {

              data.forEach((item) => {
                item.isFavorite = true;
              });

              listingActions.getListings({IDs: _.map(data, 'id')})
                .then(() => {
                  resolve();
                })
                .catch((err) => {
                  console.error('Error loading favorites: ', err);
                  reject(err);
                });
            }
          });
      });
    };
  }
};

export default favoriteActions;

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

const fetchFavorites = () => {
  return (dispatch, getState) => {
    const userId = getState().userReducer.userId;
    dispatch(requestFavorites(userId));

    // get favorites for user from the server
    // todo cancel this if everything is cached so spinner doesn't appear on cache hit
    return dataApi.trailAngelApi.getFavorites(userId)
      .then((data) => {
        if (data !== undefined && Array.isArray(data)) {
          let promises = data.map((item) => {
            // todo need to better check for validity and not add an error response to favorites list
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

const addFavorite = (trailId) => {
  return (dispatch, getState) => {
    const userId = getState().userReducer.userId;
    return dataApi.trailAngelApi.addFavorite(userId, trailId)
      .then(() => {
        let trail = _.find(getState().trailsReducer.trails, { id: trailId });

        if (trail === undefined) {
          trail = _.find(getState().searchReducer.results, { id: trailId });
        }

        if (trail === undefined) {
          return Promise.reject('unable to find trail');
        }

        return dispatch({
          type: actionTypes.ADD_FAVORITE,
          trailData: trail
        });
      })
      .then((data) => {
        return dispatch({
          type: data.trailData.isSearchResult ?
                actionTypes.UPDATE_SEARCH_RESULT :
                actionTypes.UPDATE_TRAIL,
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

const removeFavorite = (trailId) => {
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
        let trail = _.find(getState().trailsReducer.trails, { id: trailId });

        if (trail === undefined) {
          trail = _.find(getState().searchReducer.results, { id: trailId });
        }

        if (trail === undefined) {
          return;
        }

        return dispatch({
          type: trail.isSearchResult ?
                actionTypes.UPDATE_SEARCH_RESULT :
                actionTypes.UPDATE_TRAIL,
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