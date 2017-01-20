'use strict';

const temperature = {
  convertToFahrenheit: (temp) => {
    return (temp * ( 9 / 5 )) + 32;
  },

  convertToCelcius: (temp) => {
    return (temp - 32) * ( 5 / 9 );
  }
};

export default temperature;