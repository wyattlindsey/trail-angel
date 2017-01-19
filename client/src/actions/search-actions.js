import actionTypes from './action-types';
import dataApi from '../api';

const searchActions = {
  search: (query, location, limit) => {
    // todo: add some parameter validation
    return (dispatch) => {
      dispatch({
        type: actionTypes.SUBMIT_SEARCH
      });

      return dataApi.googlePlaces.search({
        query,
        latitude: location.latitude,
        longitude: location.longitude
      })
        .then((results) => {
          if (results === undefined || !Array.isArray(results) || results.length === 0) {
            return false;
          } else {
            return searchActions.getDetails(results.map((result) => result.id ))
              .then((results) => {
                return results.map((result) => {
                  return {
                    ...result,
                    photoThumbUrl: dataApi.googlePlaces.getUrlForPhoto(result.photo_reference, 100),
                    photoLargeUrl: dataApi.googlePlaces.getUrlForPhoto(result.photo_reference, 400)
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

  getDetails: (IDs) => {
    // todo: check cache for these IDs
    if (!Array.isArray(IDs)) IDs = [IDs];

    let promises = IDs.map((id) => {
      return dataApi.googlePlaces.fetchDetails(id);
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