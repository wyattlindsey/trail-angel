'use strict';

import googlePlacesApi from '../google-places-api';
import request from '../../utils/request';
import { secrets } from '../../../config';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';

jest.mock('../../utils/request', () => {
  const distanceData = require('../../../__tests__/fixtures/distance-data').default;
  const reverseGeoLookupData
    = require('../../../__tests__/fixtures/reverse-geo-lookup-data').default;
  const elevationData
    = require('../../../__tests__/fixtures/elevation-data').default;

  return {
    get: jest.fn((url) => {
      return Promise.resolve(distanceData);
    })
  };
});

describe('google places api module', () => {
  it('searches with provided options', () => {
    const coords = {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    };

    return googlePlacesApi.search({
      query: 'mountain',
      latitude: coords.latitude,
      longitude: coords.longitude
    })
      .then((results) => {
        expect(request.get)
          .toBeCalledWith(`https://maps.googleapis.com/maps/api/place/` +
            `textsearch/json?query=mountain%20hiking%20trails&location=` +
            `${coords.latitude},${coords.longitude}&key=` +
            `${secrets.google.apiKey}`);
      });
  });
});