import * as request from '../utils/request';
import * as config from './config';
const apiKey = config.secrets.wunderground.apiKey;

const getUrl = (latitude, longitude, dataFeature = 'conditions') => {
  return `https://api.wunderground.com/api/${apiKey}/forecast/geolookup/${dataFeature}/q/${lat},${lng}.json`;
}

export const getWeatherForGeolocation = (latitude, longitude) => {
  return request.get(getUrl(latitude, longitude))
    .then((response) => response.json())
    .then((responseJSON) => {
      return {
        current: responseJSON.current_observation,
        forecast: responseJSON.forecast.simpleforecast.forecastday
      }
    });
};