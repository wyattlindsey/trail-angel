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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options)
    })
      .catch((err) => {
        console.error(err);
      });
  },

  update: () => {
    return fetch(url, {
      method: 'PUT',
      body: options
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.error(err);
      });
  },

  remove: () => {
    return fetch(url, {
      method: 'DELETE',
      body: options
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export default request;
