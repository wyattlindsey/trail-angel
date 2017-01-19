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
        [props.forecast.currently, ...props.forecast.daily.data].map((dailyForecast, i) => {
          // if this is the first day through the list, tack on the current day at
          // the very beginning of the list
          return (
            <DailyForecastListItem key={i}
                                   dailyForecast={dailyForecast}
                                   forecast={props.forecast}
                                   today={i === 0}
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
          {props.today ? 'Today' : time.weekday(props.dailyForecast.time)}
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
      {props.forecast === undefined ?
        <View /> :
        props.forecast.hourly.data.map((forecast, i) => {
          return (
            <DailyForecastListItem key={i}
                                   hourlyForecast={hourlyForecast}
                                   forecast={props.forecast}
                                   navigator={props.navigator}
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
      <WeatherIcon icon={props.forecast.icon}
                   size={35}
                   color={'darkgreen'}
      />
      <Text style={styles.forecastHeading}>
        {time.weekday(props.forecast.time)} : </Text>
    </View>
    <Text style={{ paddingBottom: 10 }}>{props.forecast.summary}</Text>
    <Text style={{ fontSize: 11 }}>
      {'H: ' + props.forecast.apparentTemperatureMax + 'F° ' +
      time.formatted12HourTime(props.forecast.apparentTemperatureMaxTime)
      }
    </Text>
    <Text style={{ fontSize: 11 }}>
      {time.formatted12HourTime(props.forecast.time)}
    </Text>
    {props.forecast.precipProbability > 0 ?
      <Text style={{ fontSize: 11 }}>
        {props.forecast.precipProbability * 100 + '% chance of ' + props.forecast.precipType === undefined ? props.forecast.precipType : ''}</Text> : <View />
    }

  </View>
);

// todo: this needs to navigate to another weather forecast component filled with hourly list items

const handleDailyForecastPress = (props) => {
  // const offsetHours = findRemainingHoursInHourlyForecast(props.dailyForecast.time);
  const now = Date.now();
  const today = time.dayOfWeek(now);
  const forecastDay = time.dayOfWeek(props.dailyForecast.time);
  const offsetDays = forecastDay - today;

  const currentHour = time.hourOfDay(now);
  const forecastHour = time.hourOfDay(props.dailyForecast.time);

  const offsetHours = offsetDays * 24 + (forecastHour - currentHour);
  const startIndex = offsetDays === 0 ? currentHour : offsetDays * 24;
  const endIndex = (24 * offsetDays) + 24;
  debugger;

  let hourlyForecastCopy = [...props.forecast.hourly.data];
  debugger;

  props.navigator.push({
    title: 'Hourly Forecast',
    component: HourlyForecast,
    passProps: {
      hourlyForecast: props.hourlyForecast,
      forecast: props.forecast
    }
  });
};

const timeBeforeForecast = (timestamp) => {
  const now = Date.now();
  const today = time.dayOfWeek(now);
  const forecastDay = time.dayOfWeek(timestamp);
  const offsetDays = forecastDay - today;

  const currentHour = time.hourOfDay(now);
  const forecastHour = time.hourOfDay(timestamp);
  const offsetHours = forecastDay - currentHour;

  // forecastDay is too far out for hourly forecast
  if (offset > 3) {
    return false;
  } else {
    return true;
  }
};


export default DailyWeatherForecast;