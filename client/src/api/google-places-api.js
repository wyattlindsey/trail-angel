'use strict';

import * as config from '../../config';
import request from '../utils/request';

const apiKey = config.secrets.google.apiKey;

const googlePlacesApi = {

  search: (options = {}) => {
    const searchOptions = {...options}

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

        if (data.result.photos !== undefined) {
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

// // limit to 10 results or less
// const limit = Math.min(10, data.results.length);
// data.results.splice(limit, data.results.length - limit);
//
// let promises = data.results.map((result) => {
//   const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${result.place_id}&key=${apiKey}`;
//   let thumbnailUrl = false;
//   let photoReference = false;
//
//   if (result.photos !== undefined) {
//     thumbnailUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${result.photos[0].photo_reference}&key=${apiKey}`;
//     photoReference = result.photo_reference;
//   }
//
//   return request.get(placeDetailsUrl)
//     .then((placeDetails) => {
//       return placeDetails.result;
//     })
//     .then((details) => {
//       return {
//         ...details,
//         photoReference,
//         photoUrl: thumbnailUrl || details.icon
//       }
//     });
// });
//
// return Promise.all(promises)
//   .then((data) => {
//     return data.map((item) => {
//       return {
//         ...item,
//         id: item.place_id
//       };
//     });
//   })
//   .catch((err) => {
//     console.log('error getting promise data', err);
//   });