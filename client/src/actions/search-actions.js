import actionTypes from './action-types';
import time from '../utils/time';
import dataApi from '../api';

const searchActions = {
  search: (query = '', location = null, limit = 10) => {
    // todo: add some parameter validation
    // todo: handle limit
    return (dispatch, getState) => {
      dispatch({
        type: actionTypes.SUBMIT_SEARCH
      });

      const options = location ? {
        query,
        latitude: location.latitude,
        longitude: location.longitude
      } : { query };

      return dataApi.googlePlaces.search(options)
        .then((results) => {
          if (results === undefined ||
            !Array.isArray(results) ||
            results.length === 0) {
            return false;
          } else {
            return dispatch(searchActions.getDetails(results.map((result) => result.id )))
              .then((results) => {
                return results.map((result) => {
                  return {
                    ...result,
                    photoThumbUrl: dataApi.googlePlaces.getUrlForPhoto
                    (result.photo_reference, 100),
                    photoLargeUrl: dataApi.googlePlaces.getUrlForPhoto
                    (result.photo_reference, 400)
                  };
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
          debugger;
          const cacheTimestamp = cache[id].cacheTimestamp;
          const now = Date.now();

          // and it's less than 2 weeks old
          if (time.elapsedTime(cacheTimestamp, now) < 1209600000 /* two weeks */) {
            // use the cached version
            console.log('cache hit');
            return cache[id];

          } else {
            dispatch({
              type: actionTypes.REMOVE_FROM_STORAGE,
              id
            });
          }
        }

        // uncached and cached-but-expired listings should be re-fetched
        return dataApi.googlePlaces.fetchDetails(id)
          .then((details) => {
            const now = Date.now();
            let obj = {
              type: actionTypes.SAVE_TO_STORAGE,
              data: {
                ...details,
                cacheTimestamp: now
              }
            };
            dispatch({
              type: actionTypes.SAVE_TO_STORAGE,
              data: {
                ...details,
                cacheTimestamp: now
              }
            });
            return details;
          });
      });

      return Promise.all(promises);
    };
  },

  cancelRequest: () => {
    return (dispatch) => {
      dispatch({
        type: actionTypes.CANCEL_REQUEST
      });

      dispatch({
        type: actionTypes.RECEIVE_SEARCH_RESULTS,
        searchResults: []
      });
    }
  }
};

export default searchActions;