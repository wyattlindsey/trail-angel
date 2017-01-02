import { paths } from '../../config';
import * as request from '../utils/request';

export const baseUrl = paths.trailAngel.baseUrl;

export const getFavorites = (options) => {
  return request.get(`${baseUrl}/api/trailfaves`, options);
}