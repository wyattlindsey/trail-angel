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
        console.error(err);
      });
  },

  get: (url, options = {}) => {
    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  add: (url, options) => {
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(options)
    })
      .catch((err) => {
        console.error(err);
      });
  },

  update: (url, options) => {
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(options),
      headers
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  remove: (url, options) => {
    return fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(options),
      headers
    })
      .catch((err) => {
        console.error(err);
      });
  }
};

export default request;
