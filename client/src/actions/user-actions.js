import * as actions from './';
import trailAngelApi from '../api/trailangel-api';

export function createUser(data) {
  return {
    type: actions.CREATE_USER,
    data
  };
}

export function updateUser() {
  return {
    type: actions.UPDATE_USER,
    userId,
    data
  };
}

export function deleteUser() {
  return {
    type: actions.DELETE_USER,
    userId
  };
}

export function loginUser(data) {
  trailAngelApi.addUser({userId: data.userId});

  return {
    type: actions.LOGIN_USER,
    data
  };
}