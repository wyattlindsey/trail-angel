'use strict';

import * as _ from 'lodash';

import actionTypes from './action-types';
import dataApi from '../api';

const listingActions = {
  // todo promisify
  getListings: (options = false) => {
    return (dispatch, getState) => {
      const search = JSON.stringify(options);
      const searches = getState().listingsReducer.searches;
      const cache = getState().listingsReducer.cache;

      const cachedListing = findInCache(search, searches, cache);
      // if the search isn't cached, fetch the data
      if (!cachedListing) {

        dispatch(fetchListings());
        dataApi.yelp(options)
          .then((results) => {
            return dispatch(receiveListings(results, {  search,
                                                        results: _.map(results, 'id')}));
          })
          .catch((err) => {
            console.error('Error retrieving listing data', err);
          });
      } else {
      // otherwise, pull from local storage
        return dispatch(receiveListings(cachedListing, false));
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

const findInCache = (search, searches, cache) => {
  const cached = searches[search];
  if (cached === undefined) return false;

  const listingIDs = cached.results;
  return _.map(listingIDs, (id) => {
    // debugger;
    const listing = _.find(cache, { 'id': id });
    if (listing !== undefined) {
      return listing;
    }
  });
};

const fetchListings = () => {
  return {
    type: actionTypes.FETCH_LISTINGS
  };
};

const receiveListings = (searchResults, searchToSave) => {
  return {
    type: actionTypes.RECEIVE_LISTINGS,
    searchResults,
    searchToSave
  }
};

// todo update store when async storage changes


export default listingActions;