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
    return request.get(`${baseUrl}/api/trailfaves/user/${ userId }`)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error('Error fetching favorites: ', err);
      });
  },

  addFavorite: (userId, trailId) => {
    return request.add(`${baseUrl}/api/trailfaves/${trailId}`, { userId });
  },

  removeFavorite: (userId, trailId) => {
    return request.remove(`${baseUrl}/api/trailfaves/${trailId}`, { userId });
  }
};

export default trailAngelApi;
