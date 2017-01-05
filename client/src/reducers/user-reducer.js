'use strict';

import actionTypes from '../actions/action-types';

const initialState = {
  userId: null,
  email: null,
  avatarUrl: null,
}

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        userId: action.profile.userId,
        email: action.profile.email,
        avatarUrl: action.profile.avatarUrl
      };
    default:
      return state;
  }
}