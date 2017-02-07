'use strict';

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Item from '../../list/Item.component';
import homeData from '../../../../__tests__/fixtures/home-data';
import geolocationData from '../../../../__tests__/fixtures/geolocation-data';

jest.mock('../../list/Details.component', () => 'Details');
jest.mock('../../../api/google-api');
jest.mock('../../../api/darksky-api');

test('renders correctly', () => {
  const data = homeData[0];
  const tree = renderer.create(
    <Item favorites={data}
          userLocation={geolocationData}
          {...data}
    />
  );
  expect(tree).toMatchSnapshot();
});