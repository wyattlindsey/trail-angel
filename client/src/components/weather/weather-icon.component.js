'use strict';

import React from 'react';
import { View } from 'react-native';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  'hail':                   'weather-hail',
  'thunderstorm':           'weather-lightnight',
  'tornado':                'weather-windy',
  'sunrise':                'weather-sunset-up',
  'sunset':                 'weather-sunset',
  'default':                'weather-sunny'
};

const WeatherIcon = (props) => (    // Material Design Community has a great set of
                                    // weather icons, but none for partly cloudy night
                                    // so using Ionicons for that one instance
  <View>
    {props.icon === 'partly-cloudy-night' ?
      <Ionicons name='md-cloudy-night'
                     {...props}
      /> :
      <MaterialDesignIcons name={weatherIcons[props.icon]}
                                {...props}
      />
    }
  </View>
);

export default WeatherIcon;