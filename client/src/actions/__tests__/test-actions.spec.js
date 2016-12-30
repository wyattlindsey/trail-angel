import * as testActions from '../test-actions';
import mockStore from 'redux-mock-store';

const store = mockStore();

describe('testActions', () => {
  it('creates a TEST_INCREMENT action', () => {
    expect(testActions.testIncrement()).toMatchSnapshot();
  });

  it('creates a TEST_DECREMENT action', () => {
    expect(testActions.testDecrement()).toMatchSnapshot();
  });

  // use the async/await pattern to test in async conditions
  // snapshot isn't really showing anything here but possibly with a mocked ajax library
  // this will work
  it('dispatches a TEST_INCREMENT action asynchronously', async () => {
    await store.dispatch(testActions.testIncrementAsync());
    expect(store.getActions()).toMatchSnapshot();
  });
});