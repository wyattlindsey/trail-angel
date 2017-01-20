'use strict';

import * as config from '../../config';
import request from '../utils/request';

const apiKey = config.secrets.google.apiKey;

const googlePlacesApi = {

  search: (options = {}) => {
    const searchOptions = {...options};

    if (searchOptions.id !== undefined) {
      return searchByID(searchOptions.id);
    }

    if (searchOptions.latitude && searchOptions.longitude) {
      searchOptions.location = `${searchOptions.latitude},${searchOptions.longitude}`;
    }

    searchOptions.query = searchOptions.query + '%20hiking%20trails';
    searchOptions.key = apiKey;

    delete searchOptions.latitude;
    delete searchOptions.longitude;
    if (searchOptions.collection !== undefined) {
      delete searchOptions.collection;
    }

    const keys = Object.keys(searchOptions);

    let parameters = keys.reduce((memo, k, i) => {
      if (!searchOptions[k]) {
        return memo;
      } else {
        return memo += `${k}=${searchOptions[k] || ''}${i === keys.length - 1 ? '' : '&'}`;
      }
    }, '');

    var url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${parameters}`;
    console.log(url);
    return request.get(url)
      .then((data) => {
        if (data === undefined || data.results === undefined) {
          return false;
        } else {
          return data.results.map((result) => {
            return {
              ...result,
              id: result.place_id
            }
          });
        }
      })
      .catch((err) => {
        console.log('error getting google data', err);
      });
  },

  fetchDetails: (id) => {
    return request.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${config.secrets.google.apiKey}`)
      .then((data) => {
        if (data === undefined) {
          Promise.reject('Error retrieving Google place data by ID');
        }

        let photoReference = false;
        let photoThumbnailUrl = false;
        let photoLargeUrl = false;

        if (data.result.photos !== undefined && Array.isArray(data.result.photos)) {
          photoThumbnailUrl = googlePlacesApi.getUrlForPhoto(data.result.photos[0].photo_reference, 100);
          photoLargeUrl = googlePlacesApi.getUrlForPhoto(data.result.photos[0].photo_reference, 400);
          photoReference = data.result.photo_reference;
        }

        return {
          ...data.result,
          id: data.result.place_id,
          photoReference,
          photoThumbnailUrl: photoThumbnailUrl || data.result.icon,
          photoLargeUrl: photoLargeUrl || data.result.icon
        };
      });
  },

  getUrlForPhoto:(photoReference, maxWidth) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
  }

};

export default googlePlacesApi;