'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  userId: null,
  email: null,
  nickname: null,
  avatarUrl: null,
  hasToken: false
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.RECEIVE_USER_DATA:
      return {
        ...state,
        userId: action.profile.userId,
        email: action.profile.email,
        nickname: action.profile.nickname,
        avatarUrl: action.profile.avatarUrl,
        hasToken: true
      };

    case actionTypes.LOGIN_USER:
      return {
        ...state,

      };

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        hasToken: false
      };

    default:
      return state;
  }
};