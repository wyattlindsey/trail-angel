'use strict';

import config from '../../config';
import request from '../utils/request';

const apiKey = config.GOOGLE_API;

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

    const url = `https://maps.googleapis.com/maps/api/place/` +
                `textsearch/json?${parameters}`;
    return request.get(url)
      .then((data) => {
        if (data === undefined || data.results === undefined) {
          return false;
        } else {
          let results = data.results.slice(0, 5);
          return results.map((result) => {
            return {
              ...result,
              id: result.place_id
            }
          });
        }
      })
      .catch((err) => {
        console.error('error getting google data', err);
      });
  },

  fetchDetails: (id) => {
    if (!id) return Promise.resolve(false);
    return request.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${config.GOOGLE_API}`)
      .then((data) => {
        if (data === undefined) {
          return Promise.reject('Error retrieving Google place data by ID');
        }

        let photoReference = false;
        let photoThumbnailUrl = false;
        let photoLargeUrl = false;

        if (data.result.photos !== undefined && Array.isArray(data.result.photos)) {
          photoThumbnailUrl =
            googlePlacesApi.getUrlForPhoto(data.result.photos[0].photo_reference, 100);
          photoLargeUrl =
            googlePlacesApi.getUrlForPhoto(data.result.photos[0].photo_reference, 400);
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
    return `https://maps.googleapis.com/maps/api/place/photo?` +
      `maxwidth=${maxWidth}&photoreference=${photoReference}&key=${apiKey}`;
  }

};

export default googlePlacesApi;
