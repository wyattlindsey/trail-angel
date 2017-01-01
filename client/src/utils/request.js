

export const show = (url, id, options) => {
  return fetch(`${url}/${id}`, options);
};

export const get = (url, options) => {
  return fetch(url, options);
}