import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import time from '../../utils/time';
import WeatherIcon from './weather-icon.component';

const styles = StyleSheet.create({
  forecastListItem: {
    margin: 25,
    padding: 25,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    borderRadius: 25
  },

  forecastHeading: {
    fontSize: 18,
    lineHeight: 35,
    color: 'darkgreen',
    fontStyle: 'italic'
  }
})

const DailyWeatherForecast = (props) => (
  <ScrollView>
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
                                   offset={props.forecast.offset}
                                   day={true}
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
                        underlayColor='#ffffff'>
      <View style={{ alignItems: 'center' }}>
        <WeatherIcon icon={props.dailyForecast.icon}
                     size={35}
                     color={'darkgreen'}
        />
        <Text style={styles.forecastHeading}>
          {props.today ? 'Today' : time.weekday(props.dailyForecast.time, props.offset)}
        </Text>
      </View>
    </TouchableHighlight>
    <Text style={{ paddingBottom: 10 }}>{props.dailyForecast.summary}</Text>
    {!props.today ?
      <View>
      <Text style={{ fontSize: 11 }}>
        {'H: ' + props.dailyForecast.apparentTemperatureMax + 'F° ' +
          time.formatted12HourTime(props.dailyForecast.apparentTemperatureMaxTime)
        }
      </Text>
      <Text style={{ fontSize: 11 }}>
        {'L: ' + props.dailyForecast.apparentTemperatureMin + ' F° ' +
          time.formatted12HourTime(props.dailyForecast.apparentTemperatureMinTime)
        }
      </Text>
      {props.dailyForecast.precipProbability > 0 ?
        <Text style={{ fontSize: 11 }}>
              {props.dailyForecast.precipProbability * 100 + '% chance of ' + props.dailyForecast.precipType === undefined ? props.dailyForecast.precipType : ''}
      </Text> : <View />
      }
    </View> : <View />
    }

  </View>
);

const HourlyWeatherForecast = (props) => (
  <ScrollView>
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
                   size={35}
                   color={'darkgreen'}
      />
      <Text style={styles.forecastHeading}>
        {time.formatted12HourTime(props.hourlyForecast.time)}
      </Text>
    </View>
    <Text style={{ paddingBottom: 10 }}>{props.hourlyForecast.summary}</Text>
    <Text style={{ fontSize: 11 }}>
      {props.hourlyForecast.apparentTemperature + 'F°'}
    </Text>
    {props.hourlyForecast.precipProbability > 0 ?
      <Text style={{ fontSize: 11 }}>
        {props.hourlyForecast.precipProbability * 100 + '% chance of ' +
          props.hourlyForecast.precipType === undefined ?
          props.hourlyForecast.precipType : ''}</Text> : <View />
    }
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

  const startIndex = offsetDays > 0 ? hoursUntilMidnight: 0;
  const endIndex = offsetDays * 24 + hoursUntilMidnight + startIndex;


  return { startIndex, endIndex };
};


export default DailyWeatherForecast;