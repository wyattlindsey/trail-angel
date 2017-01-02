import { paths } from '../../config';
import * as request from '../utils/request';

const baseUrl = paths.trailAngel.baseUrl;

const trailAngelApi = {
  baseUrl,

  getFavorites: (userId) => {

    return request.get(`${baseUrl}/api/trailfaves`, { userId });
  },

  addFavorite: (userId, trailName) => {

    return request.post(`${baseUrl}/api/trailfaves`, { userId, trailName });
  },

  removeFavorite: (userId, trailName) => {

    return request.remove(`${baseUrl}/api/trailfaves`, { userId, trailName });
  }
};

export default trailAngelApi;
