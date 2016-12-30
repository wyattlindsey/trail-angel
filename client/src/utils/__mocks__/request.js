import { weatherData } from './weather-data';

export function get(url) {
  return new Promise((resolve, reject) => {
    // check for various features of url to determine which mock data to use
    // if it's a Wunderground API URL...
    process.nextTick(() => {
      resolve(JSON.parse(weatherData));
    });

    // reject promise if there's a problem with the request
  })
}