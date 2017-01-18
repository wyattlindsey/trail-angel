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
  
  // Searching for keyword "Hiking Trails" at current location 
  // var url = `https://maps.googleapis.com/maps/api/place/search/json?${parameters}`; 
  
  var photo_reference_json = []; //Storing main photo of all trails
  var place_ids_json = []; //Storing detail URLs of every single trail found

  return request.get(url)

    .then((data) => { 
       debugger;

      for(var i=0; i < data.results.length; i++) {
        var place = data.results[i].place_id;
        var photo = data.results[i].photos[0].photo_reference;
        console.log('PHOTO ------:', photo);

        if(typeof(photo) === 'undefined') {
          photo = data.results.icon;
        }
        
      //API request for grabbing photo of specific trail
        var url2 =`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo}&key=${options.key}`;
      //API request for grabbing details of specific trail
        var url1 = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=${options.key}`; 
        console.log('ACTUAL PHOTO: ', url2);

        place_ids_json.push(url1);
        photo_reference_json.push(url2);
      }

        console.log('Second URL response: ', place_ids_json);
        console.log('Third URL response: ', photo_reference_json);


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