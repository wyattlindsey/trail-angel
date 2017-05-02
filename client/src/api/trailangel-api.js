'use strict';

import config from '../../config';
import request from '../utils/request';

let baseUrl = config.TRAIL_ANGEL_API_URL.trim();
baseUrl = baseUrl.replace(/\/$/, '');

const trailAngelApi = {
  /**
   *      Favorites
   *
   *
   */

  getFavorites: (userId) => {
    return request.get(`${baseUrl}/api/trailfaves/user/${ userId }`)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error('error fetching favorites: ', err);
      });
  },

  addFavorite: (userId, trailId) => {
    return request.add(`${baseUrl}/api/trailfaves/${trailId}`, { userId });
  },

  removeFavorite: (userId, trailId) => {
    return request.remove(`${baseUrl}/api/trailfaves/${trailId}`, { userId });
  },

  /**
   *      Geolocations - coordinates for saved mapped trails
   *
   *
   */

  getGeo: (trailId, userId, options) => {
    return request.get(`${baseUrl}/api/geolocations/${trailId}/${userId}`, options)
      .then((geolocations) => {
        return geolocations;
      })
      .catch((err) => {
        console.error('error fetching geolocations for mapped trail: ', err);
      });
  },

  addGeo: (trailId, options) => {
    return request.add(`${baseUrl}/api/geolocations/${trailId}`, options);
  },

  updateGeo: (trailId, options) => {
    return request.update(`${baseUrl}/api/geolocations/${trailId}`, options);
  },

  removeGeo: (trailId, options) => {
    return request.remove(`${baseUrl}/api/geolocations/${trailId}`, options);
  },

  /**
   *      Geolocations - distance
   *
   *
   */

  getDistanceMappedTrail: (trailId, userId) => {
    return request.get(`${baseUrl}/api/geolocations/${trailId}/${userId}/distance`)
      .then((distance) => {
        return distance;
      })
      .catch((err) => {
        console.error('error fetching distance of mapped trail: ', err);
      });
  },

  /**
   *      Supply List Items
   *
   *
   */

  getSupplyItems: (userId) => {
    return request.get(`${baseUrl}/api/supplyitems/user/${userId}`)
      .then((data) => {
      return data;
      })
      .catch((err) => {
        console.error('error fetching supply list items: ', err);
      });
  },

  addSupplyItem: (userId, itemName) => {
    console.log('addSupplyItem invoked with userID: ', userId, ' itemName: ', itemName);
    return request.add(`${baseUrl}/api/supplyitems/${itemName}`, { userId });
  },

  removeSupplyItem: (userId, itemName) => {
    console.log('removeSupplyItem invoked with userID: ', userId, ' itemName: ', itemName);
    return request.remove(`${baseUrl}/api/supplyitems/${itemName}`, { userId });
  }
};

export default trailAngelApi;
