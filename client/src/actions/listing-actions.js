'use strict';

import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';

import actionTypes from './action-types';
import dataApi from '../api';

const listingActions = {
  getListings: (options = false) => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const search = JSON.stringify(options);
        const searches = getState().listingsReducer.searches;
        const cache = getState().listingsReducer.cache;

        const cachedListing = findInCache(search, searches, cache);

        // if the search isn't cached, fetch the data
        if (!cachedListing) {

          dispatch(fetchListings());
          dataApi.yelp(options)
            .then((results) => {
              if (results === undefined) {
                return resolve(false);
              }

              // saved search includes an array of result IDs for later lookup
              const searchToSave = {
                type: 'search',
                search,
                results: _.map(results, 'id')
              };

              // create the array of tuples that AsyncStorage uses
              const listings = results.map((result) => {
                return [result.id, JSON.stringify({...result, type: 'listing'})];
              });

              // store the saved search with results IDs
              AsyncStorage.setItem(search, JSON.stringify(searchToSave));
              // store the raw data for listingsReducer's cache object
              AsyncStorage.multiSet(listings);

              // update the in-memory store with the data and search/result object
              dispatch(receiveListings(results, {  search,
                results: _.map(results, 'id')}));

              return resolve(true);
            })
            .catch((err) => {
              console.error('Error retrieving listing data', err);
            });
        } else {
          // otherwise, pull from local storage and send no search to save
          dispatch(receiveListings(cachedListing, false));

          return resolve(true);
        }
      });
    };
  },

  cancelRequest: () => {
    return (dispatch) => {
      dispatch({
        type: actionTypes.CANCEL_REQUEST
      });

      dispatch(receiveListings([]));
    }
  },

  updateListings: (listings) => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const updatedListings = {};
        const storageTuples = [];
        const cache = getState().listingsReducer.cache;

        listings.forEach((listing) => {
          if (listing.type === 'listing' && cache[listing.id] !== undefined) {
            updatedListings[listing.id] = {
              ...cache[listing.id],
              ...listing
            };

            storageTuples.push([ listing.id,  JSON.stringify(listing)]);
          }
        });

        AsyncStorage.merge(storageTuples)
          .then(() => {
            dispatch({
              type: actionTypes.UPDATE_LISTINGS,
              updatedListings
            });
            return resolve();
          })
          .catch((err) => {
            console.error('Error updating listings: ', err);
            return reject(err);
          });
      });
    };
  }
};

const findInCache = (search, searches, cache) => {
  const cached = searches[search];
  if (cached === undefined) return false;

  const listingIDs = cached.results;
  return _.map(listingIDs, (id) => {
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


export default listingActions;