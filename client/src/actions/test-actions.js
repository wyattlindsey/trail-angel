import * as actionTypes from './action-types';
import * as dataApi from '../api';

const update = (custom, actionType) => {
  return {
    type: actionType,
    custom: custom
  };
}

export const testIncrement = (custom) => {
  // traditional action creator style
  return {
    type: actionTypes.TEST_INCREMENT,
    custom: custom
  };
};

export const testDecrement = (custom) => {
  // traditional action creator style
  return {
    type: actionTypes.TEST_DECREMENT,
    custom: custom
  };
};

export const testIncrementAsync = (custom) => {
  // by returning a function, the Thunk middleware is invoked
  return (dispatch, getState) => {
    // you could do something async here before dispatching
    // or only dispatch conditionally

    dataApi.yelp.searchYelp()
      .then((data) => {
        dispatch({
          type: 'TEST_INCREMENT',
          custom: JSON.stringify(data)
        })
      });
  };
}

export const getYelpData = () => {
  return {
    type: actionTypes.GET_YELP_DATA
  };
};