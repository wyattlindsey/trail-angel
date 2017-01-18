import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import time from '../../utils/time';
import WeatherIcon from './weather-icon.component';

const WeatherForecast = (props) => (
  <ScrollView>
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
  </ScrollView>
);

const WeatherForecastListItem = (props) => (
  <View style={{  margin: 25,
                  padding: 25,
                  backgroundColor: '#D3D3D3',
                  alignItems: 'center',
                  borderRadius: 25}}>
    <TouchableHighlight onPress={props.handlePress !== undefined ? props.handlePress() : null}
                        underlayColor='#ffffff'>
      <View style={{ alignItems: 'center' }}>
        <WeatherIcon icon={props.forecast.icon}
                     size={35}
                     color={'darkgreen'}
        />
        <Text style={{ fontSize: 18,
                       lineHeight: 35,
                       color: 'darkgreen',
                       fontStyle: 'italic'
                    }}>
        {time.weekday(props.forecast.time)} : </Text>
      </View>
    </TouchableHighlight>
    <Text style={{ paddingBottom: 10 }}>{props.forecast.summary}</Text>
      {props.type === 'daily' ?
        <Text style={{ fontSize: 11 }}>
          {'H: ' + props.forecast.apparentTemperatureMax + 'F° ' +
            time.formatted12HourTime(props.forecast.apparentTemperatureMaxTime)
          }
        </Text> : <View />
      }
      {props.type === 'daily' ?
        <Text style={{ fontSize: 11 }}>
          {'L: ' + props.forecast.apparentTemperatureMin + ' F° ' +
            time.formatted12HourTime(props.forecast.apparentTemperatureMinTime)
          }
        </Text> : <View />
      }
      {props.type === 'hourly' ?
        <Text style={{ fontSize: 11 }}>
          {time.formatted12HourTime(props.forecast.time)}
        </Text> : <View />
      }
      {props.forecast.precipProbability > 0 ?
        <Text style={{ fontSize: 11 }}>
            {props.forecast.precipProbability * 100 + '% chance of ' + props.forecast.precipType === undefined ? props.forecast.precipType : props.forecast.precipType}</Text> : <View />
      }

  </View>
)


export default WeatherForecast;