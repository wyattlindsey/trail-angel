import actionTypes from './action-types';
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

export function loginUser(data) {
  trailAngelApi.addUser({userId: data.userId});

  return {
    type: actionTypes.LOGIN_USER,
    data
  };
}

const receiveUserData = (profile) => {
  return {
    type: actionTypes.REGISTER_USER,
    profile
  };
}

export const registerUser = (profile) => {
  return {
    type: actionTypes.REGISTER_USER,
    profile
  };
};