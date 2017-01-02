fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('../../utils/request');
request = require.requireMock('../../utils/request');
import trailAngelApi from '../trailangel-api';

const baseUrl = trailAngelApi.baseUrl;

describe('trail angel client-side api', () => {
  beforeEach(() => {
    request.get = jest.fn(() => new Promise(resolve => resolve()));
    request.add = jest.fn(() => new Promise(resolve => resolve()));
    request.update = jest.fn(() => new Promise(resolve => resolve()));
    request.remove = jest.fn(() => new Promise(resolve => resolve()));
  });

  it('makes a request for favorites', () => {
    trailAngelApi.getFavorites(1);

    expect(request.get).toHaveBeenCalled();
    expect(request.get)
      .toHaveBeenCalledWith(`${baseUrl}/api/trailfaves`, { userId: 1 });
  });

  it('makes a request to add a trail favorite', () => {
    trailAngelApi.addFavorite(1, 'Strawberry Hill');

    expect(request.add).toHaveBeenCalled();
    expect(request.add)
      .toHaveBeenCalledWith(`${baseUrl}/api/trailfaves`,
        {
          userId: 1,
          trailName: 'Strawberry Hill'
        });
  });

  it('removes a trail favorite', () => {
    trailAngelApi.removeFavorite(1, 'Strawberry Hill');

    expect(request.remove).toHaveBeenCalled();
    expect(request.remove)
      .toHaveBeenCalledWith(`${baseUrl}/api/trailfaves`,
        {
          userId: 1,
          trailName: 'Strawberry Hill'
        });
  });
});
