import actionTypes from './action-types';
import { NavigatorIOS, AsyncStorage } from 'react-native';
import { secrets } from '../../config';

export function createUser(data) {
  return {
    type: actionTypes.CREATE_USER,
    data
  };
}

export function updateUser() {
  return {
    type: actionTypes.UPDATE_USER,
    userId,
    data
  };
}

export function deleteUser() {
  return {
    type: actionTypes.DELETE_USER,
    userId
  };
}

export const receiveUserData = (profile) => {
  return {
    type: actionTypes.RECEIVE_USER_DATA,
    profile
  };
}

export const loginUser = (profile) => {
  return (dispatch) => {
      return Promise.resolve(dispatch(receiveUserData(profile)));
  };
};

export const logoutUser = () => {
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
};

