import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const weatherIcons = {
  'clear-day':              'weather-sunny',
  'clear-night':            'weather-night',
  'rain':                   'weather-pouring',
  'snow':                   'weather-snowy',
  'sleet':                  'weather-snowy-rainy',
  'wind':                   'weather-windy-variant',
  'fog':                    'weather-fog',
  'cloudy':                 'weather-cloudy',
  'partly-cloudy-day':      'weather-partlycloudy',
  'partly-cloudy-night':    'weather-partlycloudy',
  'hail':                   'weather-hail',
  'thunderstorm':           'weather-lightnight',
  'tornado':                'weather-windy',
  'default':                'weather-sunny'
};

// todo define default weather icon

const WeatherIcon = (props) => (
  <View>
    <Icon name={weatherIcons[props.icon]}
          {...props}
    />
  </View>
);

export default WeatherIcon;