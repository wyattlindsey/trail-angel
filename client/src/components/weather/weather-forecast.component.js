'use strict';

import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import time from '../../utils/time';
import WeatherIcon from './weather-icon.component';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 12
  },

  forecastListItem: {
    margin: 12,
    padding: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    borderRadius: 25,
    flex: 1,
    flexDirection: 'row'
  },

  forecastDetails: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  forecastHeading: {
    fontSize: 18,
    marginRight: 15,
    lineHeight: 35,
    color: 'darkgreen',
    fontStyle: 'italic'
  },

  angleLink: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50
  }
})

const DailyWeatherForecast = (props) => (
  <ScrollView style={styles.scrollContainer}>
    <View>
      {props.forecast === undefined ?
        <View /> :
        props.forecast.daily.data.map((dailyForecast, i) => {
          if (i > 6) return <View key={i} />
          return (
            <DailyForecastListItem key={i}
                                   dailyForecast={dailyForecast}
                                   forecast={props.forecast}
                                   today={i === 0}
                                   dailyForecastAvailable={i >= 0 && i < 3}
                                   offset={props.forecast.offset}
                                   navigator={props.navigator}
            />
          );
        })
      }
    </View>
  </ScrollView>
);

const DailyForecastListItem = (props) => (
  <View style={styles.forecastListItem}>
    <TouchableHighlight onPress={handleDailyForecastPress.bind(null, props)}
                        underlayColor='#D3D3D3'>
      <View style={{ alignItems: 'center' }}>
        <WeatherIcon icon={props.dailyForecast.icon}
                     size={30}
                     color={'darkgreen'}
        />
        <Text style={styles.forecastHeading}>
          {props.today ? 'Today' : time.weekday(props.dailyForecast.time, props.offset)}
        </Text>
      </View>
    </TouchableHighlight>
    <View style={styles.forecastDetails}>
      <Text style={{ paddingBottom: 10 }}>{props.dailyForecast.summary}</Text>
      {!props.today ?
        <View>
          <Text style={{ fontSize: 11 }}>
            {'H: ' + Math.round(props.dailyForecast.apparentTemperatureMax) + 'F° ' +
              time.formatted12HourTime(props.dailyForecast.apparentTemperatureMaxTime)
            }
          </Text>
          <Text style={{ fontSize: 11 }}>
            {'L: ' + Math.round(props.dailyForecast.apparentTemperatureMin) + ' F° ' +
              time.formatted12HourTime(props.dailyForecast.apparentTemperatureMinTime)
            }
          </Text>
          {props.dailyForecast.precipProbability > 0 ?
            <Text style={{ fontSize: 11 }}>
                  {props.dailyForecast.precipProbability * 100 + '% chance of ' +
                    props.dailyForecast.precipType === undefined ? props.dailyForecast.precipType : ''
                  }
          </Text> : <View />
        }
      </View> : <View />
      }
    </View>
    {props.dailyForecastAvailable ?
      <View>
        <TouchableHighlight onPress={handleDailyForecastPress.bind(null, props)}
                            underlayColor='#D3D3D3'
                            style={styles.angleLink}>
          <Icon name='angle-right'
                size={25}
                color='darkgreen'
          />
        </TouchableHighlight>
      </View> : <View />
    }
  </View>
);

const HourlyWeatherForecast = (props) => (
  <ScrollView style={styles.scrollContainer}>
    <View>
      {props.hourlyForecast === undefined ?
        <View /> :
        props.hourlyForecast.map((hourlyForecast, i) => {
          return (
            <HourlyForecastListItem key={i}
                                    hourlyForecast={hourlyForecast}
                                    offset={props.offset}
            />
          );
        })
      }
    </View>
  </ScrollView>
);

const HourlyForecastListItem = (props) => (
  <View style={styles.forecastListItem}>
    <View style={{ alignItems: 'center' }}>
      <WeatherIcon icon={props.hourlyForecast.icon}
                   size={30}
                   color={'darkgreen'}
      />
      <Text style={styles.forecastHeading}>
        {time.formatted12HourTime(props.hourlyForecast.time)}
      </Text>
    </View>
    <View style={styles.forecastDetails}>
      <Text style={{ paddingBottom: 10 }}>{props.hourlyForecast.summary}</Text>
      <Text style={{ fontSize: 11 }}>
        {Math.round(props.hourlyForecast.apparentTemperature) + 'F°'}
      </Text>
      {props.hourlyForecast.precipProbability > 0 ?
        <Text style={{ fontSize: 11 }}>
          {props.hourlyForecast.precipProbability * 100 + '% chance of ' +
            props.hourlyForecast.precipType === undefined ?
            props.hourlyForecast.precipType : ''}</Text> : <View />
      }
    </View>
  </View>
);

// todo: this needs to navigate to another weather forecast component filled with hourly list items

const handleDailyForecastPress = (props) => {
  const startAndEnd = getForecastHoursIndicesForDay(props.dailyForecast.time, props.offset);
  const hours = [...props.forecast.hourly.data].slice(startAndEnd.startIndex,
                                                     startAndEnd.endIndex);

  if (startAndEnd) {
    props.navigator.push({
      title: 'Hourly',
      component: HourlyWeatherForecast,
      passProps: {
        hourlyForecast: hours,
        offset: props.forecast.offset
      }
    });
  }
};

const getForecastHoursIndicesForDay = (timestamp, offset) => {
  const now = Math.floor(Date.now() / 1000);
  const today = time.dayOfWeek(now);
  const forecastDay = time.dayOfWeek(timestamp, offset);
  const offsetDays = forecastDay - today + 1;

  if (offsetDays > 2 || offsetDays < 0) {
    return false;
  }

  const currentHour = time.hourOfDay(now);
  const hoursUntilMidnight = 24 - currentHour;

  let startIndex, endIndex;

  if (offsetDays === 0) {           // today
    startIndex = 0;
    endIndex = hoursUntilMidnight;
  } else if (offsetDays === 1) {    // tomorrow
    startIndex = hoursUntilMidnight;
    endIndex = startIndex + 24;
  } else if (offsetDays === 2) {    // the day after
    startIndex = hoursUntilMidnight + 24;
    endIndex = startIndex + (24 - hoursUntilMidnight + 1);
  }

  return { startIndex, endIndex };
};


export default DailyWeatherForecast;