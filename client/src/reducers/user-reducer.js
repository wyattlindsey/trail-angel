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
      debugger;
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        avatarUrl: action.avatarUrl
      };
    default:
      return state;
  }
}