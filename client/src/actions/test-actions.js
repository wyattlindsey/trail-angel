import * as actionTypes from './action-types';

export function testAction() {
  return {
    type: actionTypes.TEST_ACTION,
    foo: null,
    bar: null
  };
}