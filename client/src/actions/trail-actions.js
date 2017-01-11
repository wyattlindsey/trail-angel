'use strict';

import * as _ from 'lodash';

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
    trails: results
  };
};

// mutates the trail to include a isFavorite flag
const associateFavorites = (trails, favorite) => {
  return _.map(trails, (trail) => {
    trail.isFavorite = _.findIndex(favorite, { id: trail.id }) !== -1;
  });
};

const getDistances = (trails) => {
  _.each(trails, (trail) => {
    trail.distance = false;
    // calculate distance with google api
    // update the trail afterwards
  });
};

export const fetchTrails = (options) => {
  return (dispatch, getState) => {
    dispatch(requestTrails(options));

    return dataApi.yelp(options)
      .then((results) => {
        associateFavorites(results, getState().favoritesReducer.favorites);
        getDistances(results);

        return dispatch(receiveTrails(results));
      })
      .catch((err) => {
        console.error('error retrieving trail data', err);
      });
  };
};

export const updateTrail = (trailId, attribute, newValue) => {
  return {
    type: actionTypes.UPDATE_TRAIL,
    trailId,
    attribute,
    newValue
  };
};