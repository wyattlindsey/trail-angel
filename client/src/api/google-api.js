'use strict';

import { secrets } from '../../config';
import request from '../utils/request';

const googleApi = {
  getDistance2Points: (origin, destination) => {
    // so things don't explode
    if (origin === undefined || destination === undefined) {
      return Promise.resolve(false);
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${secrets.google.apiKey}`;

    return request.get(url)
      .then((response) => {

        if (response.rows[0].elements[0].distance !== undefined) {
          return response.rows[0].elements[0].distance;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error('Error fetching distance data: ', err);
      });
  },

  getCity: (coords) => {
    // so things don't explode
    if (coords === undefined) {
      return Promise.resolve(false);
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${secrets.google.apiKey}`;

    return request.get(url)
    .then((response) => {
      if (response.results !== undefined &&
          Array.isArray(response.results) &&
          response.results[0].formatted_address !== undefined) {
          var city = response.results[0].formatted_address.split(', ')[1];
          console.log(city);
          return city;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error('Error fetching city data: ', err);
      });
  },
  getElevation: (coordinates) => {
        // so things don't explode
    if (coordinates === undefined) {
      return Promise.resolve(false);
    }

    let locations = coordinates.map((pin) => {
      return `${pin.coordinate.latitude},${pin.coordinate.longitude}`;
    }).join('|');

    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${secrets.google.apiKey}`;

    return request.get(url)
    .then((response) => {
      let elevations = response.results;
      let elevationGain = 0;
      for(var i = 1; i < elevations.length; i++) {
        let diff = elevations[i].elevation - elevations[i-1].elevation;
        if (diff > 0) {
          elevationGain += diff;
        }
      }
      return elevationGain;
    })
    .catch((err) => {
      console.error('Error fetching city data: ', err);
    });
  }
};

export default googleApi;