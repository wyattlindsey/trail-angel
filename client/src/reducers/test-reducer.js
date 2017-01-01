'use strict';

import * as actionTypes from '../actions/action-types';

// exporting for testing purposes
export const initialState = {
  foo: 42,
  bar: 'hello',
  custom: 'nullllll'
}

export default function testReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.TEST_INCREMENT:
      return {
        ...state,
        foo: state.foo * 2,
        bar: state.bar === 'hi' ? 'hello' : state.bar += 'o',
        custom: action.custom
      };
    case actionTypes.TEST_DECREMENT:
      return {
        ...state,
        foo: state.foo / 2,
        bar: state.bar.length < 6 ? 'hi' : state.bar.substring(0, state.bar.length - 1),
        custom: action.custom
      }
    case actionTypes.GET_YELP_DATA:
      return state;
    default:
      return state;
  }
}