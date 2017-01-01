import * as yelp from '../yelp-api';
fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('../../utils/request');
// const request = require('../../utils/request');
request = require.requireMock('../../utils/request');

describe('yelp api', () => {
  request.get = jest.fn(() => new Promise(resolve => resolve()));

  it('should make a request with the correct default parameters', () => {
    yelp.searchYelp();
    expect(request.get).toHaveBeenCalled();

    var urlWithoutTokens = request.get.mock.calls[0][0].split('&oauth_consumer_key')[0];
    expect(urlWithoutTokens).toBe('https://api.yelp.com/v2/search?category_filter=hiking&limit=10&location=San%20Francisco');
  });
});