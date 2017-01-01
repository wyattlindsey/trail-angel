import * as weather from '../wunderground-api';

jest.mock('../../utils/request');

describe('weather api', () => {
  it('should get a forecast', () => {
    return weather.getWeatherForGeolocation(45.3296, -121.9112)
      .then((data) => {   // need to mock fetch itself for the .json() thing to work
        console.log(data);
        expect(data.forecast.length).toEqual(4);
      });
  })
});