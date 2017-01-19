'use strict';
import { AsyncStorage } from 'react-native';
import actionTypes from './action-types';
import * as userActions from './user-actions';
import listingActions from './listing-actions';
import searchActions from './search-actions';
import favoriteActions from './favorite-actions';

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
      dispatch({
        type: actionTypes.INITIALIZE_APP
      });
      return dispatch(userActions.loginUser(profile))
        .then(() => {
          return dispatch(appActions.getGeolocation());
        })
        .then(() => {
          // return loadAsyncStorageData();
        })
        .then((data) => {
          // dispatch({
          //   type: actionTypes.LOAD_SAVED_SEARCHES,
          //   loadedSearches: data.searches
          // });
          // dispatch({
          //   type: actionTypes.LOAD_SAVED_LISTINGS,
          //   loadedListings: data.listings
          // });
          // dispatch({
          //   type: actionTypes.LOAD_SAVED_COLLECTIONS,
          //   loadedCollections: data.collections
          // });
        })
        .then(() => {
          const location = {
            latitude: getState().appReducer.geolocation.coords.latitude,
            longitude: getState().appReducer.geolocation.coords.longitude
          };
          return dispatch(searchActions.search('', location ));
        })
        .then((results) => {
          if (results.length === 0) {
            return dispatch(searchActions.search(''));
          } else {
            return results;
          }
        })
        .then((results) => {
          return dispatch(loadHomeData(results.searchResults));
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

      const searches = {};
      const listings = {};
      const collections = {};

      stores.forEach((store) => {
        const data = JSON.parse(store[1]);

        if (/^collection:/.test(store[0])) {
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
    })
};

const loadHomeData = (data) => {
  return {
    type: actionTypes.LOAD_HOME_DATA,
    data
  };
}

export default appActions;