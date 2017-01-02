const request = {
  show: (url, id, options) => {
    return fetch(`${url}/${id}`, options)
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });
  },

  get: (url, options) => {
    return fetch(url, options)
      .then((response) => response.json())
      .then((responseJSON) => {
        return responseJSON;
      });
  },

  add: () => {

  },

  update: () => {

  },

  remove: () => {

  }
};

export default request;
