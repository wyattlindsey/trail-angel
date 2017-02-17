'use strict';

const dimensions = {
  navHeight: (orientation = 'portrait') => {
    return orientation === 'portrait' ?
      64 : 44
  }
};

export default dimensions;