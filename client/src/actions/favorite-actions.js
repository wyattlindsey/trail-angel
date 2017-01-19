import actionTypes from './action-types';
import dataApi from '../api';

const favoriteActions = {
  loadFavorites: () => {
    return (dispatch, getState) => {
      dataApi.trailAngelApi.getFavorites(getState().userReducer.userId)
        .then((results) => {
          console.log('results: ', results);
        });
    };
  }
};

export default favoriteActions;