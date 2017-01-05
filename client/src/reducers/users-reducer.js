'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  userId: null,
  email: null,
  avatarUrl: null,
}

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {...state, userId: action.userId, email: action.email, avatarUrl: action.avatarUrl}
    default:
      return state;
  }
}