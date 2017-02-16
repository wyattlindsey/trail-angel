'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import userActions from '../user-actions';
import profileData from '../../../__tests__/fixtures/profile-data';

const mockStore = configureStore(middlewares);

const store = mockStore({});

jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.unmock('../user-actions');

describe('user actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    store.clearActions();
    mockAsyncStorage.release();
  });

  it('should log a user in', () => {
    return store.dispatch(userActions.loginUser(profileData))
      .then((result) => {
        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(
          {
            type: 'RECEIVE_USER_DATA',
            profile: profileData
          }
        );

        expect(result).toMatchSnapshot();
      });
  });

  it('should logout a user', () => {
    return store.dispatch(userActions.logoutUser())
      .then((result) => {
        const actions = store.getActions();
        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: 'LOGOUT_USER' });
        expect(result).toMatchSnapshot();
      });
  });

  it('should receive user data', () => {
    const dispatchReceiveUserData
      = store.dispatch(userActions.receiveUserData(profileData));
    const actions = store.getActions();

    expect(actions.length).toBe(1);
    expect(actions[0]).toEqual(
      {
        type: 'RECEIVE_USER_DATA',
        profile: profileData
      });

    expect(dispatchReceiveUserData)
      .toMatchSnapshot();
  });
});