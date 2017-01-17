'use strict';

import * as _ from 'lodash';
import { AsyncStorage } from 'react-native';

import actionTypes from './action-types';
import dataApi from '../api';

const listingActions = {
  getListings: (options = {}) => {
    return (dispatch, getState) => {
      const search = JSON.stringify(options);
      const searches = getState().listingsReducer.searches;
      const cache = getState().listingsReducer.cache;

      return new Promise((resolve, reject) => {

        // if we don't need to search because IDs were passed in with `options` parameter
        if (options.id !== undefined || options.IDs !== undefined) {
          // todo load favorites call is also bringing in empty IDs property for options, going straight to catch block
          return getListingById(options.id || options.IDs, cache)
            .then((results) => {
              dispatch(storeResults(search, results, options.collection));
              return results;
            })
            .catch((err) => {
              console.error('Error getting listings by ID: ', err);
            });
        } else {
          // otherwise search based on search terms
          const cachedListing = findInCache(search, searches, cache);

          // if the search isn't cached, fetch the data
          if (!cachedListing) {

            dispatch(fetchListings());

            dataApi.yelp(options)
              .then((results) => {
                if (results === undefined) {
                  return resolve(false);
                }

                dispatch(storeResults(search, results, options.collection))
                  .then((results) => {
                    resolve(results);
                  });
              })
              .catch((err) => {
                console.error('Error retrieving listing data', err);
                reject(err);
              });
          } else {
            // otherwise, pull from local storage and send no search to save
            dispatch(receiveListings(cachedListing, false));
            resolve(true);    // ???
          }
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
          if (cache[listing.id] !== undefined) {
            const cachedObject = cache[listing.id];
            updatedListings[listing.id] = {
              ...cachedObject,
              ...listing
            };

            storageTuples.push([ listing.id,  JSON.stringify(listing)]);
          }
        });

        AsyncStorage.multiMerge(storageTuples)
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
  },

  loadFavorites: () => {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        const userId = getState().userReducer.userId;
        dataApi.trailAngelApi.getFavorites(userId)
          .then((IDs) => {
            if (IDs !== undefined && Array.isArray(IDs)) {
              dispatch(listingActions.getListings({IDs, collection: 'favorites'}))
                .then((listings) => {
                  // ensure that every favorite from the server is marked as a favorite locally
                  listings.forEach((listing) => {
                    dispatch(listingActions.addToCollection(listing.id, 'favorites'));
                  });
                  resolve(listings);
                });
            } else {
              reject(new Error('Error loading favorites: invalid input'));
            }
          })
          .catch((err) => {
            console.error('Error loading favorites: ', err);
            reject(err);
          });
      });
    };
  },

  addToCollection: (id, collectionName) => {
    return (dispatch, getState) => {
      const cache = getState().listingsReducer.cache;
      const collections = getState().listingsReducer.collections;
      const item = cache[id];

      const collectionArray = item.collections === undefined ? [] : item.collections;

      dispatch(listingActions.updateListings([
        {
          ...item,
          collections: [
            ...collectionArray,
            collectionName
          ]
        }
      ]));

      if (_.find(collections[collectionName], {'id': id}) === undefined) {
        const modifiedCollection = [...collections[collectionName], cache[id]];

        dispatch(updateCollection(collectionName, modifiedCollection));

        AsyncStorage.setItem(`collection:${collectionName}`, JSON.stringify(modifiedCollection));
      }
    };
  },

  removeFromCollection: (id, collectionName) => {
    return (dispatch, getState) => {
      const cache = getState().listingsReducer.cache;
      const collections = getState().listingsReducer.collections;
      const item = {...cache[id]};
      if (item.collections === undefined) {
        return;
      }
      const i = item.collections.indexOf(collectionName);

      if (i !== -1) {
        item.collections.splice(i, 1);
      }

      dispatch(listingActions.updateListings([
        {
          ...cache[id],
          collections: item.collections
        }
      ]));

      const j = _.find(collections[collectionName], {'id': id});

      if (j !== undefined) {
        const modifiedCollection = [...collections[collectionName]];
        modifiedCollection.splice(j, 1);

        dispatch(updateCollection(collectionName, modifiedCollection));

        AsyncStorage.setItem(`collection:${collectionName}`, JSON.stringify(modifiedCollection));
      }
    };
  }
};

const getListingById = (IDs, cache) => {
  if (!Array.isArray(IDs)) IDs = [IDs];
  let promises = IDs.map((id) => {
    const cachedListing = _.find(cache, { 'id': id });
    if (cachedListing === undefined) {
      return dataApi.yelp({ id: id })
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.error('Error fetching listing by ID: ', err);
        });
    } else {
      return cachedListing;
    }
  });

  return Promise.all(promises);
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

const storeResults = (search, results, collection) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // saved search includes an array of result IDs for later lookup
      const IDs = _.map(results, (data) => {
        return data.place_id;
      });

      const searchToSave = {
        type: 'search',
        search,
        results: IDs
      };

      // create the array of tuples that AsyncStorage uses
      const listings = results.map((result) => {
        return [result.id, JSON.stringify({...result, type: 'listing' })];
      });

      // update the in-memory store with the data and search/result object
      dispatch(receiveListings(results, {  search,
        results: _.map(results, 'id')}, collection));

      // store the saved search with results IDs
      return AsyncStorage.setItem(search, JSON.stringify(searchToSave))
        .then(() => {
          // store the raw data for listingsReducer's cache object
          return AsyncStorage.multiSet(listings);
        });
    });
  };
}

const fetchListings = () => {
  return {
    type: actionTypes.FETCH_LISTINGS
  };
};

const receiveListings = (searchResults, searchToSave, collection) => {
  return {
    type: actionTypes.RECEIVE_LISTINGS,
    searchResults,
    searchToSave,
    collection
  }
};

const updateCollection = (name, collection) => {
  return {
    type: actionTypes.UPDATE_COLLECTION,
    name,
    collection
  };
};


export default listingActions;