import appReducer from '../app-reducer';
import geolocationData from '../../../__tests__/fixtures/geolocation-data';
import actionTypes from '../../actions/action-types';

const initialState = {
  isLoaded: false,
  geolocation: null,
  gettingLocation: false
};

test('initializes app', () => {
  expect(appReducer(initialState, { type: actionTypes.INITIALIZE_APP })).toMatchSnapshot();
});

test('fetches geolocation', () => {
  expect(appReducer(initialState, { type: actionTypes.GET_GEOLOCATION })).toMatchSnapshot();
});

test('receives geolocation', () => {
  expect(appReducer(initialState, { type: actionTypes.RECEIVE_GEOLOCATION,
                                    geolocation: geolocationData
                                  }
        )).toMatchSnapshot();
});