import actionTypes from './action-types';
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
            const cache = getState().listingsReducer.cache;
            return searchActions.getDetails(results.map((result) => result.id ), cache)
              .then((results) => {
                return results.map((result) => {
                  return {
                    ...result,
                    photoThumbUrl: dataApi.googlePlaces.getUrlForPhoto
                                      (result.photo_reference, 100),
                    photoLargeUrl: dataApi.googlePlaces.getUrlForPhoto
                                      (result.photo_reference, 400)
                  };
                })
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

  getDetails: (IDs, cache) => {
    // todo: check cache for these IDs
    if (!Array.isArray(IDs)) IDs = [IDs];
    let promises = IDs.map((id) => {
      // if (cache[id] === undefined) {
      //   const cacheTimestamp = cache[id].cacheTimestamp;
      //   // const now =
      // }
      return cache[id] === undefined ? dataApi.googlePlaces.fetchDetails(id) : cache[id];
    });

    return Promise.all(promises);
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