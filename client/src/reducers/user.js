'use strict';

const initialState = {
  username: '',
  password: '',
  loggedIn: false       // `loggedIn` value is userId when a user is logged in
}

export default function user(state = initialState, action = {}) {
  console.log(JSON.stringify(action));
  return {...state, username: action.data};
}