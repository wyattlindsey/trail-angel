'use strict';

import { AsyncStorage } from 'react-native';
import actionTypes from './action-types';
import dataApi from '../api';

const storageActions = {
  loadListingsFromStorage: () => {
    return (dispatch) => {
      AsyncStorage.getAllKeys()
        .then((keys) => {
          return AsyncStorage.multiGet(keys);
        })
        .then((stores) => {
          if (!stores) return;

          const listings = {};

          stores.forEach((store) => {
            const data = JSON.parse(store[1]);
            const keyName = store[0].replace(/^listing:/, '');

            if (/^listing:/.test(store[0])) {
              listings[keyName] = data;
            }
          });

          return listings;
        })
        .then((listings) => {
          dispatch({
            type: actionTypes.LOAD_LISTINGS_FROM_STORAGE,
            listings
          });
        })
        .catch((err) => {
          console.error('Error loading data from local storage: ', err);
        });
    };
  },

  saveToStorage: (listing) => {
    return (dispatch) => {
      const keyName = `listing:${listing.id}`;
      AsyncStorage.setItem(keyName, JSON.stringify(listing))
        .then(() => {
          dispatch ({
            type: actionTypes.SAVE_TO_STORAGE,
            data: listing
          });
          return listing;
        });
    };
  },

  removeFromStorage: (id) => {
    return (dispatch) => {
      const keyName = `listing:${listing.id}`;
      AsyncStorage.removeItem(`listing:${listing.id}`)
        .then(() => {
          dispatch ({
            type: actionTypes.REMOVE_FROM_STORAGE,
            id
          });
        });
    };
  },

  clearAllListingsFromStorage: () => {
    return (dispatch) => {
      AsyncStorage.getAllKeys()
        .then((keys) => {
          const keysArray = keys.filter((k) => (/^listing:/.test(k)));
          AsyncStorage.multiRemove(keysArray);
        })
        .then(() => {
          dispatch({
            type: actionTypes.CLEAR_ALL_FROM_STORAGE
          })
        })
    };
  }
};

export default storageActions;