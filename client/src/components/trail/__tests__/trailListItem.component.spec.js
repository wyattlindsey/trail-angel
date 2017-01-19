import React from 'react';
import renderer from 'react-test-renderer';

import TrailListItem from '../trailListItem.component';


describe('Trail List Item component', () => {
  it('renders correctly', () => {

    const tree = renderer.create(
      <TrailListItem />
    ).toJSON();

    expect(tree).toMatchSnapshot();

  });
});
