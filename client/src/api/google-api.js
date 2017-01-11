import { secrets } from '../../config';
import request from '../utils/request';

const googleApi = {
  getDistance2Points: (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${secrets.google.apiKey}`;
    return request.get(url)
      .then((response) => {
        return response.rows[0].elements[0].distance;
      })
      .catch((err) => {
        console.error('Error fetching distance data: ', err);
      });
  }
}

export default googleApi;