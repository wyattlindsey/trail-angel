'use strict';

const trailCalc = {
  // Naismith's Rule to calculate estimated hiking time:
  calcEstimatedTime: (elevationMeters, distanceMiles) => {
    const hours = ((elevationMeters / 600) + (distanceMiles * 1.60934) / 5).toPrecision(2);
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes} mins`;
    } else {
      return `${hours} hrs`;
    }
  },

  convertToFeet: (meters) => {
    return meters * 3.28084;
  },

  convertToKm: (miles) => {
    return miles * 1.60934;
  }

};

export default trailCalc;