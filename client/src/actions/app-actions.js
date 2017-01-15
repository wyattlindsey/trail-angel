'use strict';

import actionTypes from './action-types';
import * as userActions from './user-actions';
import * as trailActions from './trail-actions';
import * as favoriteActions from './favorite-actions';

const appActions = {
  getGeolocation: (options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000}
  ) => {

    return (dispatch) => {
      dispatch({
        type: actionTypes.GET_GEOLOCATION
      });

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(dispatch(receiveGeolocation(position)));
          },
          (err) => {
            console.error('Error obtaining geolocation: ', err);
            reject(err);
          },
          options
        );
      });

    };
  },

  initializeApp: (profile) => {
    return (dispatch, getState) => {
      dispatch({
        type: actionTypes.INITIALIZE_APP
      });
      return dispatch(userActions.loginUser(profile))
        .then(() => {
          return dispatch(favoriteActions.fetchFavorites());
        })
        .then(() => {
          return dispatch(appActions.getGeolocation());
        })
        .then(() => {
          return dispatch(trailActions.fetchTrails({
            latitude: getState().appReducer.geolocation.coords.latitude,
            longitude: getState().appReducer.geolocation.coords.longitude
          }));
        })
        .catch((err) => {
          console.error('Error initializing application: ', err);
        });
    };
  }
};

const receiveGeolocation = (geolocation) => {
  return {
    type: actionTypes.RECEIVE_GEOLOCATION,
    geolocation
  };
};

export default appActions;