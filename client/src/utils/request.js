

export const show = (url, id) => {
  return fetch(`${url}/${id}`);
};

export const get = (url) => {
  return fetch(url);
}