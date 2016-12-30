import * as actionTypes from './action-types';
import * as weather from '../api/wunderground-api';

const update = (custom, actionType) => {
  return {
    type: actionType,
    custom: custom
  }
}

export const testIncrement = (custom) => {
  return (dispatch, getState) => {
    // you could do something async here before dispatching
    weather.getWeatherForGeolocation(45.3296, -121.9112);
    dispatch(update(custom, actionTypes.TEST_INCREMENT));
  };
};

export const testDecrement = (custom) => {
  return (dispatch, getState) => {
    // you could do something async here before dispatching
    dispatch(update(custom, actionTypes.TEST_DECREMENT));
  };
}