import actionTypes from './action-types';

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
    return Promise.resolve(dispatch(receiveUserData(profile)));
  };
};