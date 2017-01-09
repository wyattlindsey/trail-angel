import actionTypes from './action-types';
import * as favoriteActions from './favorite-actions';
import trailAngelApi from '../api/trailangel-api';

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

const receiveUserData = (profile) => {
  return {
    type: actionTypes.REGISTER_USER,
    profile
  };
}

export const loginUser = (profile) => {
  return (dispatch) => {
    favoriteActions.fetchFavorites(profile.userId);
    dispatch(receiveUserData(profile));
  };
};