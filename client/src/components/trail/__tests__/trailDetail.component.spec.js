import React from 'react';
import renderer from 'react-test-renderer';

import TrailDetail from '../trailDetail.component';


describe('Trail Detail component', () => {
  it('renders correctly', () => {

    const tree = renderer.create(
      <TrailDetail />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });
});
