import testReducer, { initialState } from '../test-reducer';
import { testIncrement, testDecrement } from '../../actions/test-actions';

describe('testReducer', () => {
  it('handles TEST_INCREMENT action', () => {
    expect(testReducer(initialState, testIncrement('custom thing'))).toMatchSnapshot();
  });

  it('handles TEST_DECREMENT action', () => {
    expect(testReducer(initialState, testDecrement('something else')))
      .toMatchSnapshot();
  });
});