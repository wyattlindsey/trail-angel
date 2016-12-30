import React from 'react';
import renderer from 'react-test-renderer';

import TestComponent from '../test.component';


describe('test component', () => {
  it('renders correctly', () => {
    const testIncrement = jest.fn();
    const testDecrement = jest.fn();

    const tree = renderer.create(
      <TestComponent
        testIncrement={testIncrement}
        testDecrement={testDecrement} />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });
});
