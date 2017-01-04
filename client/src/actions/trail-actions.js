import actionTypes from './action-types';
import dataApi from '../api';

const requestTrails = (options) => {
  return {
    type: actionTypes.REQUEST_TRAILS,
    options
  };
};

const receiveTrails = (results) => {
  return {
    type: actionTypes.RECEIVE_TRAILS,
    trails: results.businesses,
    receivedAt: Date.now()
  };
};

const fetchTrails = (options) => {
  return (dispatch) => {
    dispatch(requestTrails(options));

    return dataApi.yelp(options)
      .then((json) => {
        return dispatch(receiveTrails(json));
      });
  };
};

const shouldFetchTrails = (state) => {
  const trails = state.trails;
  if (!trails) {
    return true;
  } else if (state.isFetching) {
    return false;
  } else {
    return state.didInvalidate
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