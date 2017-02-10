'use strict';

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Map from '../../map/Map.component';
import homeData from '../../../../__tests__/fixtures/home-data';

jest.mock('react-native-maps');
jest.mock('../../../api/google-api');
jest.mock('../../../api/trailangel-api', () => {
  return {
    getGeo: () => {
      return Promise.resolve();
    }
  }
});
jest.mock('../../../utils/trail-calculations');

describe('Map component', () => {
  it('renders correctly', () => {
    const data = homeData[0];
    const tree = renderer.create(
      <Map {...data} />
    );
    expect(tree).toMatchSnapshot();
  });
});