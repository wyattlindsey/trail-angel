import React from 'react';
import { View } from 'react-native';

import Login from './views/login';
import Index from './views/index';
import Details from './components/list/Details.component';
import Map from './components/map/Map.component';
import {
  DailyWeatherForecast,
  HourlyWeatherForecast
} from './components/weather/weather-forecast.component';

const components = {
  Login,
  Index,
  Details,
  Map,
  DailyWeatherForecast,
  HourlyWeatherForecast
}

const router = (route, navigator) => {
  const Component = components[route.index];
  return (
    <Component navigator={navigator}
               {...route.passProps}
    />
  );
};

export const routes = {
  login: 'Login',
  index: 'Index',
  details: 'Details',
  map: 'Map',
  dailyWeatherForecast: 'DailyWeatherForecast',
  hourlyWeatherForecast: 'HourlyWeatherForecast'
};

export default router;