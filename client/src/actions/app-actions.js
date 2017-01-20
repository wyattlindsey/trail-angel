'use strict';

import { AsyncStorage } from 'react-native';
import actionTypes from './action-types';
import userActions from './user-actions';
import searchActions from './search-actions';
import favoriteActions from './favorite-actions';
import storageActions from './storage-actions';

const appActions = {
  getGeolocation: (options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000}
  ) => {

    return (dispatch) => {
      dispatch({
        type: actionTypes.GET_GEOLOCATION
      });

      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(dispatch(receiveGeolocation(position)));
          },
          (err) => {
            console.error('Error obtaining geolocation: ', err);
            reject(err);
          },
          options
        );
      });

    };
  },

  initializeApp: (profile) => {
    return (dispatch, getState) => {
      dispatch(storageActions.clearAllListingsFromStorage());
      dispatch({
        type: actionTypes.INITIALIZE_APP
      });
      return dispatch(userActions.loginUser(profile))
        .then(() => {
          return dispatch(appActions.getGeolocation());
        })
        .then(() => {
          return dispatch(storageActions.loadListingsFromStorage());
        })
        .then(() => {
          const location = {
            latitude: getState().appReducer.geolocation.coords.latitude,
            longitude: getState().appReducer.geolocation.coords.longitude
          };
          return dispatch(searchActions.search('', location ));
        })
        .then((results) => {
          if (Array.isArray(results) && results.length === 0) {
            return dispatch(searchActions.search(''));
          } else {
            return results;
          }
        })
        .then((results) => {
          if (results !== undefined && results.searchResults !== undefined) {
            return dispatch(loadHomeData(results.searchResults));
          }
        })
        .then(() => {
          return dispatch(favoriteActions.loadFavorites());
        })
        .catch((err) => {
          console.error('Error initializing application: ', err);
        });
    };
  }
};

const receiveGeolocation = (geolocation) => {
  return {
    type: actionTypes.RECEIVE_GEOLOCATION,
    geolocation
  };
};

const loadAsyncStorageData = () => {
  return AsyncStorage.getAllKeys()
    .then((keys) => {
      return AsyncStorage.multiGet(keys);
    })
    .then((stores) => {
      if (!stores) return;

      const listings = {};

      stores.forEach((store) => {
        const data = JSON.parse(store[1]);

        if (/^listing:/.test(store[0])) {
          collections[store[0]] = store[1];
        }

        switch (data.type) {
          case 'listing':
            listings[store[0]] = data;
            return;
          case 'search':
            searches[store[0]] = data;
            return;
          default:
            return;
        }
      });

      return { searches, listings, collections };
    })
    .catch((err) => {
      console.error('Error loading data from local storage: ', err);
    });
};

const loadHomeData = (data) => {
  return {
    type: actionTypes.LOAD_HOME_DATA,
    data
  };
}

export default appActions;