'use strict';

import * as config from './config';
import * as request from '../utils/request';
import OAuthSimple from 'oauthsimple';
const oauth = new OAuthSimple(config.secrets.yelp.consumerKey, config.secrets.yelp.tokenSecret);

export const searchYelp = (options = {}) => {

  if (options.location === undefined &&
      (options.latitude === undefined || options.longitude === undefined)) {
    options.location = 'San Francisco';

  } else if (options.location && options.latitude && options.longitude) {
    options.cll = `${options.latitude},${options.longitude}`;

  } else if (!options.location && options.latitude && options.longitude) {
    delete options.location;
    options.ll = `${options.latitude},${options.longitude}`;
  }

  // don't need these temp value as they're now encoded in the `cll` or `ll` keys
  delete options.latitude;
  delete options.longitude;

  options.limit = options.limit || 10;
  options.category_filter = options.category_filter || 'hiking';

  const keys = Object.keys(options);



  const parameters = keys.reduce((memo, k, i) => {
    if (!options[k]) {
      return memo;
    } else {
      return memo += `${k}=${options[k] || ''}${i === keys.length - 1 ? '' : '&'}`;
    }
  }, '');

  const signedRequest = oauth.sign({
    action: 'GET',
    path: 'https://api.yelp.com/v2/search',
    parameters: parameters,
    signatures: {
      api_key: config.secrets.yelp.consumerKey,
      shared_secret: config.secrets.yelp.consumerSecret,
      access_token: config.secrets.yelp.token,
      access_secret: config.secrets.yelp.tokenSecret
    }
  });

  return request.get(signedRequest.signed_url)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    });

};
