'use strict';

import weather from '../darksky-api';
import request from '../../utils/request';
import { secrets } from '../../../config';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';

jest.unmock('../darksky-api');

jest.mock('../../utils/request', () => {
  const weatherData = require('../../../__tests__/fixtures/weather-data');
  return {
    get: jest.fn(() => {
      return Promise.resolve(weatherData);
    })
  };
});

describe('darksky api', () => {
  it('gets weather for geolocation', () => {
    return weather( geolocationData.coords.latitude,
                    geolocationData.coords.longitude )
      .then((results) => {
        expect(request.get)
          .toBeCalledWith(`https://api.darksky.net/forecast/` +
                          `${secrets.darksky.apiKey}/` +
                          `${geolocationData.coords.latitude},` +
                          `${geolocationData.coords.longitude}`);

        expect(results).toMatchSnapshot();
      });
  });

  it('throws an error when latitude or longitude are missing', () => {
    return weather()
      .catch((err) => {
        expect(err).toEqual('Invalid latitude/longitude provided.');
      });
  })
});