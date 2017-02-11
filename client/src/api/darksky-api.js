'use strict';

import { secrets } from '../../config';
import request from '../utils/request';

const getUrl = (latitude, longitude) => {
  return `https://api.darksky.net/forecast/${secrets.darksky.apiKey}/${latitude},${longitude}`;
};

const getWeatherForGeolocation = (latitude, longitude) => {
  if (latitude === undefined || longitude === undefined) {
    const errString = 'Invalid latitude/longitude provided.';
    console.error(errString);
    return Promise.reject(errString);
  }
  return request.get(getUrl(latitude, longitude))
    .then((response) => {
      if (response === undefined) {
        return Promise.resolve(false);
      } else {
        return response;
      }
    })
    .catch((err) => {
      console.error('Error fetching darksky weather data: ', err);
    });
};

export default getWeatherForGeolocation;