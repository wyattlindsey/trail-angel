fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('../../utils/request');
request = require.requireMock('../../utils/request');
import * as trailAngelApi from '../trailangel-api';

const baseUrl = trailAngelApi.baseUrl;

describe('trail angel client-side api', () => {
  beforeEach(() => {
    request.get = jest.fn(() => new Promise(resolve => resolve()));
  });

  it('makes a request for favorites', () => {
    trailAngelApi.getFavorites(1);

    expect(request.get).toHaveBeenCalled();
    expect(request.get)
      .toHaveBeenCalledWith(`${baseUrl}/api/trailfaves/`, { userId: 1 });
  });

  it('adds a trail favorite', () => {
    trailAngelApi.addFavorite(1, { userId: 1 });

    expect(request.update).toHaveBeenCalled();
    expect(request.update)
      .toHaveBeenCalledWith(`${baseUrl}/api/trailfaves/1}`, { userId: 1 });
  });

  it('removes a trail favorite', () => {
    trailAngelApi.removeFavorite(1, { userId: 1 });

    expect(request.remove).toHaveBeenCalled();
    expect(request.remove)
      .toHaveBeenCalledWith(`${baseUrl}/api/trailfaves/1}`, { userId: 1 });
  });
});