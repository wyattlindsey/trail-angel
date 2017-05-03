'use strict';

import actionTypes from './action-types';
import time from '../utils/time';
import dataApi from '../api';
import storageActions from './storage-actions';

const searchActions = {
  search: (query = '', location = null, limit = 10) => {
    // todo: add some parameter validation
    // todo: handle limit
    return (dispatch) => {
      dispatch({
        type: actionTypes.SUBMIT_SEARCH
      });

      const options = location ? {
        query,
        latitude: location.latitude,
        longitude: location.longitude
      } : { query };

      return dataApi.google.search(options)
        .then((results) => {
          if (results === undefined ||
            !Array.isArray(results) ||
            results.length === 0) {
            return false;
          } else {
            return dispatch(searchActions.getDetails(results.map((result) => result.id )))
              .then((results) => {
                return results.map((result) => {
                  if (result.photos === undefined) {
                    return result;
                  } else {
                    const randomIndex = Math.floor(Math.random() * result.photos.length);
                    return {
                      ...result,
                      photoThumbUrl: dataApi.google.getUrlForPhoto
                      (result.photos[randomIndex].photo_reference, 100),
                      photoLargeUrl: dataApi.google.getUrlForPhoto
                      (result.photos[randomIndex].photo_reference, 400)
                    };
                  }
                });
              })
              .then((detailedResults) => {
                return dispatch({
                  type: actionTypes.RECEIVE_SEARCH_RESULTS,
                  searchResults: detailedResults
                });
              })
              .catch((err) => {
                console.error('Error retrieving detailed search results: ', err);
              });
          }
        })
        .catch((err) => {
          console.error('Error retrieving search results: ', err);
        });
    };
  },

  getDetails: (IDs) => {
    return (dispatch, getState) => {
      let cache = getState().listingsReducer.cache;
      if (!Array.isArray(IDs)) IDs = [IDs];
      let promises = IDs.map((id) => {
        // if the item exists in the cache
        if (cache[id] !== undefined) {
          const cacheTimestamp = cache[id].cacheTimestamp;
          const now = Date.now();
          // and it's less than 2 weeks old
          if (cacheTimestamp !== undefined &&
            time.elapsedTime(now, cacheTimestamp) > 1209600000 /* two weeks */) {
            dispatch({
              type: actionTypes.REMOVE_FROM_STORAGE,
              id
            });
          } else {
            // use the cached version
            return cache[id];
          }
        }

        // fallthrough for:
        // uncached and cached-but-expired listings, since
        // they should be re-fetched
        return dataApi.google.fetchDetails(id)
          .then((details) => {
            if (!!details) {
              const now = Date.now();
              const data = {
                ...details,
                cacheTimestamp: now
              };
              dispatch(storageActions.saveToStorage(data));
              return details;
            }
          });
      });

      return Promise.all(promises);
    };
  },

  cancelRequest: () => {
    return (dispatch) => {
      return new Promise((resolve) => {
        dispatch({
          type: actionTypes.CANCEL_REQUEST
        });

        dispatch({
          type: actionTypes.RECEIVE_SEARCH_RESULTS,
          searchResults: []
        });

        resolve();
      });
    }
  }
};

export default searchActions;
