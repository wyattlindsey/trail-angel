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
    // eventually use this call for live server but return thenabble data like below
    // return request.get(`${baseUrl}/api/trailfaves/user/${ userId }`);

    // just while using json-server for testing
    return request.get(`${baseUrl}/api/users/${ userId }`)
            .then((data) => {
              return data.favorites;
            });

    // for testing:
    // return Promise.resolve([
    //   "bernal-heights-park-san-francisco",
    //   "andy-goldsworthys-wood-line-san-francisco",
    //   "strawberry-hill-san-francisco",
    //   "batteries-to-bluffs-trail-san-francisco"
    // ]);
  },

  addFavorite: (userId, trailName) => {
    return request.add(`${baseUrl}/api/trailfaves`, { userId, trailName });
  },

  removeFavorite: (userId, trailName) => {
    return request.remove(`${baseUrl}/api/trailfaves`, { userId, trailName });
  }
};

export default trailAngelApi;
