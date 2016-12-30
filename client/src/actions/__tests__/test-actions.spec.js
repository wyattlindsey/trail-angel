import * as testActions from '../test-actions';

describe('testActions', () => {
  it('creates a TEST_INCREMENT action', () => {
    expect(testActions.testIncrement()).toMatchSnapshot();
  });

  it('creates a TEST_DECREMENT action', () => {
    expect(testActions.testDecrement()).toMatchSnapshot();
  });

  it('dispatches a TEST_INCREMENT action asynchronously', () => {
    // this will require  mocking of the library (e.g. axios) and probably
    // also redux-mock-store
  });
});