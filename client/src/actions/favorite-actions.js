import * as actions from './';

export default function addFavorite() {
  return {
    type: actions.ADD_FAVORITE,
    userId,
    trailId
  };
}

export default function removeFavorite() {
  return {
    type: actions.REMOVE_FAVORITE,
    userId,
    trailId
  };
}