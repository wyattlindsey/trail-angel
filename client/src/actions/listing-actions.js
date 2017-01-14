'use strict';

import * as _ from 'lodash';

import actionTypes from './action-types';
import dataApi from '../api';

const listingActions = {
  getListings: (options = false) => {
    return (dispatch, getState) => {
      const search = JSON.stringify(options);

      // if the search isn't cached, fetch the data
      // todo query async storage instead
      if (getState().listingsReducer.searches[search] === undefined) {
        dispatch(fetchListings());

        return dataApi.yelp(options)
          .then((results) => {
            // todo store in async storage, but only the ones that don't exist yet
            return dispatch(receiveListings(results, { search, results: _.map(results, 'id')}));
          })
          .catch((err) => {
            console.error('Error retrieving listing data', err);
          });
      } else {
        // todo pull it from async storage
        // todo enforce size limitation for cached results
      }
    };
  },

  cancelRequest: () => {
    return (dispatch) => {
      dispatch({
        type: actionTypes.CANCEL_REQUEST
      });

      dispatch(receiveListings([]));
    }
  }
};

const fetchListings = () => {
  return {
    type: actionTypes.FETCH_LISTINGS
  };
}

const receiveListings = (listings, search) => {
  return {
    type:actionTypes.RECEIVE_LISTINGS,
    listings,
    search
  }
}

// todo update store when async storage changes


export default listingActions;