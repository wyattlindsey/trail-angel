'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import storageActions from '../storage-actions';

const mockStore = configureStore(middlewares);

describe('storage actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    mockStore.clearActions();
    mockAsyncStorage.release();
  });

  it('loads listings from storage', () => {
    return mockStore.dispatch(storageActions.loadListingsFromStorage())
      .then((results) => {
        expect(results).toMatchSnapshot();
      });
  });

  it('saves to storage', () => {
    return mockStore.dispatch(storageActions.saveToStorage({ foo: 'bar' }))
      .then((results) => {
        expect(results).toMatchSnapshot();
      });
  });

  it('removes from storage', () => {
    return mockStore.dispatch(storageActions.removeFromStorage(123))
      .then((results) => {
        expect(results).toMatchSnapshot();
      });
  });

  it('clears all listings from storage', () => {
    return mockStore.dispatch(storageActions.clearAllListingsFromStorage())
      .then((results) => {
        expect(results).toMatchSnapshot();
      });
  });
});