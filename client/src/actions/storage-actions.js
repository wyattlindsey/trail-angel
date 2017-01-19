import actionTypes from './action-types';
import dataApi from '../api';

const storageActions = {
  loadListingsFromStorage: () => {

  },

  saveToStorage: (listing) => {
    return {
      type: actionTypes.SAVE_TO_STORAGE,
      data: listing
    };
  },

  removeFromStorage: (id) => {

  },

  clearAllListingsFromStorage: () => {

  }
};

export default storageActions;