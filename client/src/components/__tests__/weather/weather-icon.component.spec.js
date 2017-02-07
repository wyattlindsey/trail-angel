'use strict';

import { View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import WeatherIcon from '../../weather/weather-icon.component';
import weatherData from '../../../../__tests__/fixtures/weather-data';

describe('weather icon component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <View>
        <WeatherIcon icon={weatherData.daily.data[0].icon} />
        <WeatherIcon icon={weatherData.daily.data[1].icon} />
        <WeatherIcon icon={weatherData.daily.data[2].icon} />
      </View>
    );
    expect(tree).toMatchSnapshot();
  });
});