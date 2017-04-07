import React from 'react';
import { BackAndroid } from 'react-native';

import Login from './views/login';
import Index from './views/index';
import Details from './components/list/Details.component';
import Map from './components/map/Map.component';
import SupplyList from './components/supply-list/SupplyList.component'
import {
  DailyWeatherForecast,
  HourlyWeatherForecast
} from './components/weather/weather-forecast.component';

const components = {
  Login,
  Index,
  Details,
  Map,
  SupplyList,
  DailyWeatherForecast,
  HourlyWeatherForecast
}

class Router extends React.Component {
  constructor(props) {
    super(props);

    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (props.navigator && props.navigator.getCurrentRoutes().length > 2) {
        props.navigator.pop();
        return true;
      }
      return false;
    });
  }

  render() {
    const Component = components[this.props.route.index];
    return (
      <Component navigator={this.props.navigator}
                 {...this.props.route.passProps}
      />
    );
  }
}

export const routes = {
  login: 'Login',
  index: 'Index',
  details: 'Details',
  map: 'Map',
  dailyWeatherForecast: 'DailyWeatherForecast',
  hourlyWeatherForecast: 'HourlyWeatherForecast'
};

export default Router;
