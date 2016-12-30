import * as http from '../utils/http';

const apiKey = '42dec93e32e6a8d2';

const getUrl = (lat, lng, dataFeature = 'conditions') => {
  return `https://api.wunderground.com/api/${apiKey}/forecast/geolookup/${dataFeature}/q/${lat},${lng}.json`;
}

export const getWeatherForGeolocation = (lat, lng) => {
  return http.get(getUrl(lat, lng))
    .then((response) => response.json())
    .then((responseJSON) => {
      return {
        current: responseJSON.current_observation,
        forecast: responseJSON.forecast.simpleforecast.forecastday
      }
    });
};