fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('../../utils/request');
request = require.requireMock('../../utils/request');
import weather from '../darksky-api';
import { secrets } from '../../../config';

// jest.mock('../../utils/request');

describe('trail angel client-side api', () => {
  beforeEach(() => {
    // request.get = jest.fn(() => new Promise(resolve => resolve()));
  });

  it('makes a request for weather data', () => {
    weather(45.3296, -121.9112);

    expect(request.get).toHaveBeenCalled();

    expect(request.get)
      .toHaveBeenCalledWith(`https://api.darksky.net/forecast/${secrets.darksky.apiKey}/45.3296,-121.9112`);
  });
});