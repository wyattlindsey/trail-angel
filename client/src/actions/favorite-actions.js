import * as actions from './';

export function addFavorite() {
  return {
    type: actions.ADD_FAVORITE,
    userId,
    itemId
  };
}

export function removeFavorite() {
  return {
    type: actions.REMOVE_FAVORITE,
    userId,
    itemId
  };
}