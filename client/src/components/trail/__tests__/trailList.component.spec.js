import React from 'react';
import renderer from 'react-test-renderer';

import TrailList from '../trailList.component';


describe('Trail List component', () => {
  it('renders correctly', () => {

    const tree = renderer.create(
      <TrailList />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });
});
