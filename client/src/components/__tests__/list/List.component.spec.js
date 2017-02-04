'use strict';

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import List from '../../list/List.component';
import homeData from '../fixtures/home-data';
import geolocationData from '../fixtures/geolocation-data';

jest.mock('../../list/Item.component', () => 'Item');

test('renders correctly', () => {
  const tree = renderer.create(
    <List items={homeData}
          favorites={[]}
          userLocation={geolocationData}

    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});