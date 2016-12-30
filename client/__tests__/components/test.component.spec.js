import React from 'react';
import renderer from 'react-test-renderer';

import TestComponent from '../../src/components/test.component';


it('renders a test component view using Snapshots', () => {
  const testIncrement = jest.fn();

  const tree = renderer.create(
    <TestComponent
      testIncrement={testIncrement}
      testDecrement={testIncrement} />
  ).toJSON();

  expect(tree).toMatchSnapshot();

});