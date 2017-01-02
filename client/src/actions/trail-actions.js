import actionTypes from './action-types';
import dataApi from '../api';

const requestTrails = (options) => {
  return {
    type: actionTypes.REQUEST_TRAILS,
    options
  };
};

const receiveTrails = (trails) => {
  return {
    type: actionTypes.RECEIVE_TRAILS,
    trails,
    receivedAt: Date.now()
  };
};

const fetchTrails = (options) => {
  return (dispatch) => {
    dispatch(requestTrails(options));

    return dataApi.yelp(options)
      .then((json) => {
        dispatch(receiveTrails(json));
      });
  };
};

const shouldFetchTrails = (state) => {
  const trails = state.trails;
  if (!trails) {
    return true;
  } else if (trails.isFetching) {
    return false;
  } else {
    return trails.didInvalidate
  }
};

export const fetchTrailsIfNeeded = (options) => {
  return (dispatch, getState) => {
    if (shouldFetchTrails(getState(), options)) {
      return dispatch(fetchTrails(options));
    } else {
      return Promise.resolve();
    }
  }
};