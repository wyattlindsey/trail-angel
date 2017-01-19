import actionTypes from './action-types';
import dataApi from '../api';

const searchActions = {
  search: (options) => {
    // todo: add some parameter validation
    return (dispatch) => {
      return dataApi.googlePlaces.search(options)
        .then((results) => {
          if (results === undefined || !Array.isArray(results) || results.length === 0) {
            return false;
          } else {
            return results;
          }
        })
        .catch((err) => {
          console.error('Error retrieving search results: ', err);
        });
    };
  }
};

export default searchActions;