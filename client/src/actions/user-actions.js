'use strict';

import actionTypes from './action-types';
import { NavigatorIOS, AsyncStorage } from 'react-native';
import { secrets } from '../../config';

const userActions = {
  loginUser: (profile) => {
    return (dispatch) => {
      return Promise.resolve(dispatch(userActions.receiveUserData(profile)));
    };
  },

  logoutUser: () => {
    return (dispatch, getState) => {
      return AsyncStorage.removeItem(secrets.asyncstorage.tokenKey)
        .then(() => {
          return AsyncStorage.removeItem(secrets.asyncstorage.profileKey);
        })
        .then(() => {
          return dispatch({type: actionTypes.LOGOUT_USER});
        })
        .catch((err) => {
          console.error('User Actions: logoutUser failed: ', err);
        })
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