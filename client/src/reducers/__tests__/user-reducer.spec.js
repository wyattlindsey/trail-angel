import userReducer from '../user-reducer';
import profileData from '../../../__tests__/fixtures/profile-data';
import actionTypes from '../../actions/action-types';

const initialState = {
  userId: null,
  email: null,
  nickname: null,
  avatarUrl: null,
  hasToken: false
};

describe('appReducer', () => {
  it('receives user data', () => {
    expect(userReducer(initialState,
      {
        type: actionTypes.RECEIVE_USER_DATA,
        profile: profileData
      })).toMatchSnapshot();
  });

  it('logs in a user', () => {
    expect(userReducer(initialState,
      {
        type: actionTypes.LOGIN_USER
      })).toMatchSnapshot();
  });

  it('logs out a user', () => {
    expect(userReducer(
      {
        initialState,
        hasToken: true
      },
      {
        type: actionTypes.LOGOUT_USER
      })).toMatchSnapshot();
  })
});