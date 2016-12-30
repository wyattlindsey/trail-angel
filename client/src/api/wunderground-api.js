import * as http from '../utils/http';

const apiKey = '42dec93e32e6a8d2';

const getUrl = (lat, lng, dataFeature = 'conditions') => {
  return `https://api.wunderground.com/api/${apiKey}/forecast/geolookup/${dataFeature}/q/${lat},${lng}.json`;
}

// gets current weather conditions for the specified location
export const getWeatherForGeolocation = (lat, lng) => {
  return http.get(getUrl(lat, lng))
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON.current_observation;
    });
};

// pulls 3 day forecast as an array of 4 days including the current
export const getForecastForGeolocation = (lat, lng) => {
  return http.get(getUrl(lat, lng, 'forecast'))
    .then((response) => response.json())
    .then((responseJSON) => {
      debugger;
      return responseJSON.forecast.simpleforecast.forecastday;
    });
};