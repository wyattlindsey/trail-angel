import { secrets } from '../../config';
import request from '../utils/request';

const getUrl = (latitude, longitude) => {
  return `https://api.darksky.net/forecast/${secrets.darksky.apiKey}/${latitude},${longitude}`;
};

const getWeatherForGeolocation = (latitude = 0, longitude = 0) => {
  return request.get(getUrl(latitude, longitude))
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error('error fetching darksky weather data', err);
    });
};

export default getWeatherForGeolocation;