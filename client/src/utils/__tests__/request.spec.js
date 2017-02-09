'use strict';

import fetchMock from 'fetch-mock';
import weatherData from '../../../__tests__/fixtures/weather-data';

import request from '../request';

describe('http request module', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const weatherUrl = 'https://api.darksky.net/forecast/123/456/789';
  const apiUrl = 'https://www.trailangel.com/api';
  const id = 1234

  it('should handle get requests', () => {
    fetchMock.get(weatherUrl, weatherData, { times: 1 });
    return request.get(weatherUrl)
      .then((response) => {
        expect(fetchMock.done(weatherUrl)).toBe(true);
        expect(fetchMock.lastCall(weatherUrl)).toEqual([weatherUrl, {}]);
        expect(response).toEqual(weatherData);
      });
  });

  it('should pass options correctly', () => {
    fetchMock.get(weatherUrl, weatherData);
    request.get(weatherUrl, { foo: 'bar' });
    expect(fetchMock.lastCall(weatherUrl)).toEqual([weatherUrl, { foo: 'bar' }]);
  });

  it('should call endpoint with id when using `show()`', () => {
    const url = `${apiUrl}/${id}`;
    fetchMock.get(url, { foo: 'bar' }, { times: 1 });
    return request.show(apiUrl, id)
      .then((response) => {
        expect(fetchMock.done(url)).toBe(true);
        expect(fetchMock.lastUrl(url));
        expect(response).toEqual({ foo: 'bar' });
      });
  });

  it('should handle post requests', () => {
    fetchMock.post(apiUrl, 201, { times: 1 });
    request.add(apiUrl, { foo: 'bar' });
    expect(fetchMock.done(apiUrl)).toBe(true);
    expect(fetchMock.lastUrl(apiUrl)).toBe(apiUrl);
    expect(fetchMock.lastOptions(apiUrl)).toEqual({"body": "{\"foo\":\"bar\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "POST"});
  });

  it('should handle put requests', () => {
    fetchMock.put(apiUrl, 204, { times: 1 });
    request.update(apiUrl, { foo: 'bar' });
    expect(fetchMock.done(apiUrl)).toBe(true);
    expect(fetchMock.lastUrl(apiUrl)).toBe(apiUrl);
    expect(fetchMock.lastOptions(apiUrl)).toEqual({"body": "{\"foo\":\"bar\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "PUT"});
  });

  it('should handle delete requests', () => {
    fetchMock.delete(apiUrl, 200, { times: 1 });
    request.remove(apiUrl, { foo: 'bar' });
    expect(fetchMock.done(apiUrl)).toBe(true);
    expect(fetchMock.lastUrl(apiUrl)).toBe(apiUrl);
    expect(fetchMock.lastOptions(apiUrl)).toEqual({"body": "{\"foo\":\"bar\"}", "headers": {"Accept": "application/json", "Content-Type": "application/json"}, "method": "DELETE"});
  });
});