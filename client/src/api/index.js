'use strict';

import google from './google-api';
import googlePlaces from './google-places-api';
import weather from './darksky-api';
import trailAngelApi from './trailangel-api';

const dataApi = {
  google,
  googlePlaces,
  weather,
  trailAngelApi
};

export default dataApi;