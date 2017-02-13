'use strict';

import actionTypes from './action-types';
import { AsyncStorage } from 'react-native';
import config from '../../config';

const userActions = {
  loginUser: (profile) => {
    return (dispatch) => {
      return Promise.resolve(dispatch(userActions.receiveUserData(profile)));
    };
  },

  logoutUser: () => {
    return (dispatch) => {
      return AsyncStorage.removeItem(config.ASYNC_STORAGE_TOKEN_KEY)
        .then(() => {
          return AsyncStorage.removeItem(config.ASYNC_STORAGE_PROFILE_KEY);
        })
        .then(() => {
          return dispatch({type: actionTypes.LOGOUT_USER});
        })
        .catch((err) => {
          console.error('User Actions: logoutUser failed: ', err);
        });
    };
  },

  receiveUserData:(profile) => {
    return {
      type: actionTypes.RECEIVE_USER_DATA,
      profile
    };
  },


};

export default userActions;