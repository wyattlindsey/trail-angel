'use strict';

import google from './google-api';
import weather from './darksky-api';
import trailAngelApi from './trailangel-api';

const dataApi = {
  google,
  weather,
  trailAngelApi
};

export default dataApi;