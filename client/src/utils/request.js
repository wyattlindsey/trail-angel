'use strict';

const headers = {
  'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const request = {
  show: (url, id) => {
    return fetch(`${url}/${id}`)
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.error('error retrieving data from server', err);
      });
  },

  get: (url, options = {}) => {
    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.error('error retrieving data from server', err);
      });
  },

  add: (url, options) => {
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(options)
    })
      .catch((err) => {
        console.error('error adding record on server', err);
      });
  },

  update: (url, options) => {
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(options),
      headers
    })
      // .then((response) => response.json())
      // .then((responseJSON) => {
      //   return responseJSON;
      // })
      .catch((err) => {
        console.error('error updating data on server', err);
      });
  },

  remove: (url, options) => {
    return fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(options),
      headers
    })
      .catch((err) => {
        console.error('error removing data on server', err);
      });
  }
};

export default request;
