'use strict';

const googleApi = {
  getDistance2Points: () => {
    return Promise.resolve({"text":"4.8 mi","value":7743});
  }
};

export default googleApi;