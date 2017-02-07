'use strict';

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import weatherData from '../../../../__tests__/fixtures/weather-data';
import { DailyWeatherForecast,
         HourlyWeatherForecast } from '../../weather/weather-forecast.component';

describe('weather forecast component', () => {
  it('renders daily forecast correctly', () => {
    const tree = (
      <DailyWeatherForecast forecast={weatherData} />
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders hourly forecast correctly', () => {
    const hourlyWeatherData = weatherData.hourly.data;
    const tree = (
      <HourlyWeatherForecast hourlyForecast={weatherData} />
    );
    expect(tree).toMatchSnapshot();
  });
});