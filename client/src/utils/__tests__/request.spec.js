'use strict';

import fetchMock from 'fetch-mock';
import weatherData from '../../../__tests__/fixtures/weather-data';

import request from '../request';

describe('http request module', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const url = 'https://api.darksky.net/forecast/123/456/789';

  it('should handle get requests', () => {
    fetchMock.mock(url, weatherData, { times: 1 });
    return request.get(url)
      .then((response) => {
        expect(fetchMock.called(url)).toBe(true);
        expect(fetchMock.done(url)).toEqual(true);
        expect(fetchMock.lastCall(url)).toEqual([url, {}]);
        expect(response).toEqual(weatherData);
      });
  });

  // it('should pass options correctly', () => {
  //   fetchMock.mock()
  // });
});