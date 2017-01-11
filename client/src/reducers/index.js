'use strict';

import appReducer from './app-reducer';
import trailsReducer from './trails-reducer';
import favoritesReducer from './favorites-reducer';
import userReducer from './user-reducer';
import searchReducer from './search-reducer';

const reducers = {
  appReducer,
  trailsReducer,
  favoritesReducer,
  userReducer,
  searchReducer
};

export default reducers;