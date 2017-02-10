'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import userActions from '../user-actions';
import profileData from '../../../__tests__/fixtures/profile-data';

const mockStore = configureStore(middlewares);

describe('user actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    mockStore.clearActions();
    mockAsyncStorage.release();
  });

  it('should dispatch login user action', () => {
    return mockStore.dispatch(userActions.loginUser(profileData))
      .then((result) => {
        expect(result).toMatchSnapshot();
      });
  });

  it('should dispatch logout user action', () => {
    return mockStore.dispatch(userActions.logoutUser())
      .then((result) => {
        expect(result).toMatchSnapshot();
      });
  });

  it('should receive user data', () => {
    expect(mockStore.dispatch(userActions.receiveUserData(profileData)))
      .toMatchSnapshot();
  });
});