import { paths } from '../../config';
import request from '../utils/request';

const baseUrl = paths.trailAngel.baseUrl;

const trailAngelApi = {
  baseUrl,

  /**
   *    Users
   */

  getUser: (userId) => {
    return request.show(`${baseUrl}/api/users/${userId}`);
  },

  addUser: (options) => {
    return request.add(`${baseUrl}/api/users`, options);
  },

  updateUser: (userId, options) => {
    return request.update(`${baseUrl}/api/users/${userId}`, options);
  },

  removeUser: (userId) => {
    return request.remove(`${baseUrl}/api/users/${userId}`);
  },

  /**
   *      Favorites
   *
   *
   */

  getFavorites: (userId) => {
    return request.get(`${baseUrl}/api/trailfaves`, { userId });
  },

  addFavorite: (userId, trailName) => {
    return request.add(`${baseUrl}/api/trailfaves`, { userId, trailName });
  },

  removeFavorite: (userId, trailName) => {
    return request.remove(`${baseUrl}/api/trailfaves`, { userId, trailName });
  }
};

export default trailAngelApi;
