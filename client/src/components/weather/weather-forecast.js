import React from 'react';
import { View, Text } from 'react-native';
import time from '../../utils/time';
import WeatherIcon from './weather-icon.component';

const WeatherForecast = (props) => (
  <View>
    {props.forecast === undefined ?
      <View /> :
      props.forecast.map((forecast, i) => {
        return (
          <WeatherForecastListItem key={i}
                                   forecast={forecast}
                                   type={props.type}
          />
        );
      })
    }
  </View>
);

const WeatherForecastListItem = (props) => (
  <View>
    <WeatherIcon icon={props.forecast.icon}
                 size={15}
                 color={'darkgreen'}
    />
    <Text>{time.weekday(props.forecast.time)} : </Text>
    <Text>{props.forecast.summary}</Text>
      {props.type === 'daily' ?
        <Text>
          {'H: ' + props.forecast.apparentTemperatureMax + 'F° ' +
            time.formatted12HourTime(props.forecast.apparentTemperatureMaxTime)
          }
        </Text> : <View />
      }
      {props.type === 'daily' ?
        <Text>
          {'L: ' + props.forecast.apparentTemperatureMin + ' F° ' +
            time.formatted12HourTime(props.forecast.apparentTemperatureMinTime)
          }
        </Text> : <View />
      }
      {props.type === 'hourly' ?
        <Text>
          {time.formatted12HourTime(props.forecast.time)}
        </Text> : <View />
      }
      {props.forecast.precipProbability > 0 ?
        <Text>
            {props.forecast.precipProbability * 100 + '% chance of ' + props.forecast.precipType === undefined ? props.forecast.precipType : props.forecast.precipType}</Text> : <View />
      }

  </View>
)


export default WeatherForecast;