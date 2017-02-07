'use strict';

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Details from '../../list/Details.component';
import homeData from '../../../../__tests__/fixtures/home-data';

test('renders correctly', () => {
  const data = homeData[0];
  const tree = renderer.create(
    <Details  favorites={[]}
              {...data}
    />
  );
  expect(tree).toMatchSnapshot();
});