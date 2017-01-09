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
    trails: results.businesses   // todo factor out the .businesses part - the api should return
                                // todo results ready to go
  };
};

export const fetchTrails = (options) => {
  return (dispatch, getState) => {
    dispatch(requestTrails(options));

    return dataApi.yelp(options)
      .then((json) => {
        return dispatch(receiveTrails(json));
      });
  };
};