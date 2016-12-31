import * as actionTypes from './action-types';

const update = (custom, actionType) => {
  return {
    type: actionType,
    custom: custom
  }
}

export const testIncrement = (custom) => {
  // traditional action creator style
  return {
    type: actionTypes.TEST_INCREMENT,
    custom: custom
  }
};

export const testDecrement = (custom) => {
  // traditional action creator style
  return {
    type: actionTypes.TEST_DECREMENT,
    custom: custom
  }
};

export const testIncrementAsync = (custom) => {
  // by returning a function, the Thunk middleware is invoked
  return (dispatch, getState) => {
    // you could do something async here before dispatching
    // or only dispatch conditionally
    setTimeout(() => {
      dispatch({
        type: 'TEST_INCREMENT',
        custom: 'a little late'
      })
    }, 1000);
  };
}