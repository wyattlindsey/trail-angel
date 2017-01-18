'use strict';
import * as _ from 'lodash';

import * as config from '../../config';
import request from '../utils/request';

const yelp = (options = {}) => {
  
  const searchOptions = {...options}

  if (searchOptions.id !== undefined) {
    return searchByID(searchOptions.id);
  }

  if (searchOptions.latitude && searchOptions.longitude) {
    searchOptions.location = `${searchOptions.latitude},${searchOptions.longitude}`;
  }
  // searchOptions.radius = searchOptions.radius || '500000';
  searchOptions.rankby = searchOptions.rankby || 'distance';
  // searchOptions.type = searchOptions.type || 'point_of_interest';
  searchOptions.keyword = searchOptions.keyword || 'hiking%20trails';
  searchOptions.key = config.secrets.google.apiKey;

  delete searchOptions.latitude;
  delete searchOptions.longitude;
  if (searchOptions.collection !== undefined) {
    delete searchOptions.collection;
  }


  const keys = Object.keys(searchOptions);

  let parameters = keys.reduce((memo, k, i) => {
    if (!searchOptions[k]) {
      return memo;
    } else {
      return memo += `${k}=${searchOptions[k] || ''}${i === keys.length - 1 ? '' : '&'}`;
    }
  }, '');

  var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parameters}`; // todo try regular search instead of nearbysearch
  console.log('First URL: ',url);
  var place_ids_json = [];

  return request.get(url)
    .then((data) => {
      console.log('Outside loop');

      for(var i=0; i < data.results.length; i++) {
        console.log('Inside loop');
        var place = data.results[i].place_id;
        var url1 = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=${searchOptions.key}`;

        place_ids_json.push(url1);
      }

      console.log('Outside if statement: ', place_ids_json);

      let promises = place_ids_json.map((url) => {
        return request.get(url);
      });

      return Promise.all(promises)
        .then((data) => {
          console.log('Final Promise: ', data);
          // todo ensure that id is mapped to place_id
          return _.map(data, (item) => {
            return {
              ...item.result,
              id: item.result.place_id
            };
          });
        })
        .catch((err) => {
          console.log('error getting promise data', err);
        });


    })
    .catch((err) => {
      console.log('error getting google data', err);
    });

};

const searchByID = (id) => {  // todo consolidate this with the loop of promises above
  return request.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${config.secrets.google.apiKey}`)
    .then((data) => {
      return {
        ...data.result,
        id: data.result.place_id
      }
    });
};

export default yelp;