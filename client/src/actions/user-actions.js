import * as actions from './';

export function createUser() {
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

export function loginUser() {
  return {
    type: actions.LOGIN_USER,
    data
  };
}