import * as actionTypes from './action-types';

const update = (custom, actionType) => {
  return {
    type: actionType,
    custom: custom
  }
}

export const testIncrement = (custom) => {
  return (dispatch, getState) => {
    // you could do something async here before dispatching
    dispatch(update(custom, actionTypes.TEST_INCREMENT));
  };
};

export const testDecrement = (custom) => {
  return (dispatch, getState) => {
    // you could do something async here before dispatching
    dispatch(update(custom, actionTypes.TEST_DECREMENT));
  };
}