'use strict';

import actionTypes from './action-types';
import * as userActions from './user-actions';
import * as trailActions from './trail-actions';
import * as favoriteActions from './favorite-actions';

export const initializeApp = (profile) => {
  return (dispatch, getState) => {
    return dispatch(userActions.loginUser(profile))
      .then(() => {
        return dispatch(favoriteActions.fetchFavorites());
      })    // need to get location somewhere in here
      .then(() => {
        return dispatch(trailActions.fetchTrails());
      });
  };
};