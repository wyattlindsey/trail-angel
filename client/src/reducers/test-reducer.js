'use strict';

import * as actionTypes from '../actions/action-types';

const initialState = {
  foo: 42,
  bar: 'hello'
}

export default function testReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.TEST_ACTION:
      return {
        ...state,
        foo: 21,
        bar: 'hi'
      };
    default:
      return state;
  }
}