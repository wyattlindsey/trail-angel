'use strict';

import google from '../google-api';
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
      if (url.indexOf('distancematrix') !== -1) {
        return Promise.resolve(distanceData);
      } else if (url.indexOf('geocode') !== -1){
        return Promise.resolve(reverseGeoLookupData);
      } else if (url.indexOf('elevation') !== -1) {
        return Promise.resolve(elevationData);
      }

    })
  };
});

describe('google api module', () => {
  it('returns distance data', () => {
    const origin = {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    };

    const destination = {
      latitude: geolocationData.coords.latitude + 1,
      longitude: geolocationData.coords.longitude + 1
    };

    const url = `https://maps.googleapis.com/maps/api/distancematrix/` +
                `json?units=imperial&origins=${origin.latitude},` +
                `${origin.longitude}&destinations=${destination.latitude},` +
                `${destination.longitude}&key=${secrets.google.apiKey}`;

    return google.getDistance2Points(origin, destination)
      .then((results) => {
        expect(request.get).toBeCalledWith(url);
        expect(results).toMatchSnapshot();
      });
  });

  it('returns the city', () => {
    const coords = {
      latitude: geolocationData.coords.latitude,
      longitude: geolocationData.coords.longitude
    };

    const url = `https://maps.googleapis.com/maps/api/geocode/json?` +
                `latlng=${coords.latitude},${coords.longitude}` +
                `&key=${secrets.google.apiKey}`

    return google.getCity(coords)
      .then((results) => {
        expect(request.get).toBeCalledWith(url);
        expect(results).toMatchSnapshot();
      });

  });

  it('returns the elevation', () => {
    const coordinateSeriesData
      = require('../../../__tests__/fixtures/coordinate-series-data').default;
    const url = 'https://maps.googleapis.com/maps/api/elevation/json?locations=';

    return google.getElevation(coordinateSeriesData)
      .then((results) => {
        expect(request.get).toBeCalledWith(expect.arrayContaining([url]));
        expect(results).toMatchSnapshot();
      });
  });
});