'use strict';

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Details from '../../list/Details.component';
import homeData from '../fixtures/home-data';

test('renders correctly', () => {
  const data = homeData[0];
  const tree = renderer.create(
    <Details  favorites={[]}
              {...data}
    />
  );
  expect(tree).toMatchSnapshot();
});