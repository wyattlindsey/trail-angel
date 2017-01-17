'use strict';
import * as _ from 'lodash';

import * as config from '../../config';
import request from '../utils/request';

const yelp = (options = {}) => {

  if (options.latitude && options.longitude) {
    options.location = `${options.latitude},${options.longitude}`;
  }
  options.radius = options.radius || '500000';
  // options.rankby = options.rankby || 'distance';
  // options.type = options.type || 'point_of_interest';
  options.keyword = options.keyword || 'hiking%20trails';
  options.key = config.secrets.google.apiKey;

  delete options.latitude;
  delete options.longitude;


  const keys = Object.keys(options);

  let parameters = keys.reduce((memo, k, i) => {
    if (!options[k]) {
      return memo;
    } else {
      return memo += `${k}=${options[k] || ''}${i === keys.length - 1 ? '' : '&'}`;
    }
  }, '');

  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parameters}`;
  console.log('First URL: ',url);
  var place_ids_json = [];

  return request.get(url)
    .then((data) => {
      console.log('Outside loop');

      for(var i=0; i < data.results.length; i++) {
        console.log('Inside loop');
        var place = data.results[i].place_id;
        var url1 = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=${options.key}`;

        place_ids_json.push(url1);
      }

      console.log('Outside if statement: ', place_ids_json);

      let promises = place_ids_json.map((url) => {
        return request.get(url);
      });

      return Promise.all(promises)
        .then((data) => {
          console.log('Final Promise: ', data);
          return _.map(data, 'result');   // todo ensure that id is mapped to place_id
        })
        .catch((err) => {
          console.log('error getting promise data', err);
        });


    })
    .catch((err) => {
      console.log('error getting google data', err);
    });

};

export default yelp;