

export const show = (url, id, options) => {
  return fetch(`${url}/${id}`, options)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    });
};

export const get = (url, options) => {
  return fetch(url, options)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    });
}