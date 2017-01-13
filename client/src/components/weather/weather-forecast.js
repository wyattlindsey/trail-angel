import React from 'react';
import { View, Text } from 'react-native';
import time from '../../utils/time';
import WeatherIcon from './weather-icon.component';

const WeatherForecast = (props) => (
  <View>
    {props.forecast === undefined ?
      <Text>Goodbye cruel world!</Text> :
      props.forecast.map((day, i) => {
        return (
          <WeatherForecastListItem key={i}
                                   forecast={day}
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
    <Text>
      {`H: ${props.forecast.apparentTemperatureMax} F° ${time.formatted12HourTime(props.forecast.apparentTemperatureMaxTime)}`}
    </Text>
    <Text>
      {`L: ${props.forecast.apparentTemperatureMin} F° ${time.formatted12HourTime(props.forecast.apparentTemperatureMinTime)}`}
    </Text>
    <Text>
      {props.forecast.precipProbability > 0 ?
        `${props.forecast.precipProbability * 100} % chance of ${props.forecast.precipType === undefined ? props.forecast.precipType : props.forecast.precipType}` : ''
      }
    </Text>
  </View>
)


export default WeatherForecast;