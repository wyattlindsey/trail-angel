/**
 * This api request sub-library doesn't make use of a http request library
 * directly but instead uses the npm module yelp to handle the oauth-required
 * request headers and other yelp api specific details.
 */

'use strict';

import Yelp from 'yelp';
import secrets from './config';

const yelp = new Yelp(secrets.yelp);

export const searchYelp = ({ term = '',
                             location = {
                               name: null,
                               geo: {
                                 lat: null,
                                 lng: null
                               }
                             },
                             limit = 10,
                             sort = 0,   // 0=Best matched (default), 1=Distance, 2=Highest Rated
                             category_filter = 'hiking',    // need to test if this gives similar
                                                            // results to using the term 'hiking'
                            }) => {

  const locationObj = { location };

  let options = { term, limit, sort, category_filter };

  if (locationObj.geo.lat && locationObj.geo.lng) {
    if (locationObj.location.name) {
      options.location = locationObj.location.name;
      options.cll = `${locationObj.location.geo.lat},${locationObj.location.geo.lat}`;
    } else {
      options.ll = `${locationObj.location.geo.lat},${locationObj.location.geo.lat}`;
    }
  }

  return yelp.search(options);
};