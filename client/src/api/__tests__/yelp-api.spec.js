import * as yelp from '../yelp-api';
fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('../../utils/request');
// const request = require('../../utils/request');
request = require.requireMock('../../utils/request');

describe('yelp api', () => {

  beforeEach(() => {
    request.get = jest.fn(() => new Promise(resolve => resolve()));
  });

  afterEach(() => {
    request.get.mockReset();
  })

  it('should make a request with the correct default parameters', () => {
    yelp.searchYelp();
    expect(request.get).toHaveBeenCalled();

    var urlWithoutTokens = request.get.mock.calls[0][0].split('&oauth_consumer_key')[0];
    expect(urlWithoutTokens).toBe('https://api.yelp.com/v2/search?' +
      'category_filter=hiking&limit=10&location=San%20Francisco');
  });

  it('incorporates geolocation into request when provided a location, latitude and longitude', () => {
    yelp.searchYelp({
      location: 'San Francisco',
      latitude: 37.7856441,
      longitude: -122.4089183
    });

    var urlWithoutTokens = request.get.mock.calls[0][0].split('&oauth_consumer_key')[0];
    expect(urlWithoutTokens).toBe('https://api.yelp.com/v2/search?category_filter=hiking&' +
      'cll=37.7856441%2C-122.4089183&limit=10&location=San%20Francisco');
  });

  it('incorporates geolocation into request when provided just latitude and longitude', () => {
    yelp.searchYelp({
      latitude: 45.3296,
      longitude: -121.9112
    });


    var urlWithoutTokens = request.get.mock.calls[0][0].split('&oauth_consumer_key')[0];
    expect(urlWithoutTokens).toBe('https://api.yelp.com/v2/search?category_filter=hiking&limit=10&' +
      'll=45.3296%2C-121.9112');
  });
});