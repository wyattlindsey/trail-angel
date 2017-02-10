'use strict';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockAsyncStorage = require('mock-async-storage');

const middlewares = [thunk];

import storageActions from '../storage-actions';

const mockStore = configureStore(middlewares);
const store = mockStore({});

jest.unmock('redux-mock-store');
jest.unmock('redux-thunk');

jest.unmock('../favorite-actions');

describe('storage actions', () => {
  beforeEach(() => {
    mockAsyncStorage.mock();
  });

  afterEach(() => {
    store.clearActions();
    mockAsyncStorage.release();
  });

  it('loads listings from storage', () => {
    return store.dispatch(storageActions.loadListingsFromStorage())
      .then((results) => {
        const actions = store.getActions();

        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(
          {
            type: 'LOAD_LISTINGS_FROM_STORAGE',
            listings: {}
          }
        );

        expect(results).toMatchSnapshot();
      });
  });

  it('saves to storage', () => {
    return store.dispatch(storageActions.saveToStorage({ foo: 'bar' }))
      .then((results) => {
        const actions = store.getActions();

        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(
          {
            type: 'SAVE_TO_STORAGE',
            data: { foo: 'bar' }
          }
        );

        expect(results).toMatchSnapshot();
      });
  });

  it('removes from storage', () => {
    return store.dispatch(storageActions.removeFromStorage(123))
      .then((results) => {
        const actions = store.getActions();

        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual(
          {
            type: 'REMOVE_FROM_STORAGE',
            id: 123
          }
        );

        expect(results).toMatchSnapshot();
      });
  });

  it('clears all listings from storage', () => {
    return store.dispatch(storageActions.clearAllListingsFromStorage())
      .then((results) => {
        const actions = store.getActions();

        expect(actions.length).toBe(1);
        expect(actions[0]).toEqual({ type: 'CLEAR_ALL_FROM_STORAGE' });

        expect(results).toMatchSnapshot();
      });
  });
});