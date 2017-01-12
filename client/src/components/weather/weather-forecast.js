import React, { Component } from 'react';
import { View, Text } from 'react-native';

const WeatherForecastListItem = (props) => (
  <View>
    <Text>test</Text>
  </View>
);

class WeatherForecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.weather.forecast === undefined ? <View /> :
          this.props.weather.forecast.map((day) => {
            return (
              <View />
            )
          })
        }
      </View>
    );
  }
}

export default WeatherForecast;