import appReducer from '../app-reducer';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';
import actionTypes from '../../actions/action-types';

const initialState = {
  isLoaded: false,
  geolocation: null,
  gettingLocation: false
};

describe('appReducer', () => {
  it('initializes app', () => {
    expect(appReducer(initialState, { type: actionTypes.INITIALIZE_APP })).toMatchSnapshot();
  });

  it('fetches geolocation', () => {
    expect(appReducer(initialState, { type: actionTypes.GET_GEOLOCATION })).toMatchSnapshot();
  });

  it('receives geolocation', () => {
    expect(appReducer(initialState,
      {
        type: actionTypes.RECEIVE_GEOLOCATION,
        geolocation: geolocationData
      })).toMatchSnapshot();
  });
});