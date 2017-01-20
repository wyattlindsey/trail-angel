'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import dataApi from '../../api';
import time from '../../utils/time';
import WeatherIcon from '../weather/weather-icon.component';


const { height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 60,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tempInfo: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    opacity: 0.7
  },
  weather: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 2
  },
  tempTitle: {
    padding: 10
  },
  map: {
    width: width,
    height: height*0.60
  },
  pin: {
    backgroundColor: '#fffa',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10
  },
  pinImage: {
    width: 25,
    height: 25
  },
  pinText: {
    color: 'green'
  }
});

export default class TrailMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {}
    }
  }

  componentWillMount() {
    const that = this;
    dataApi.weather(this.props.geometry.location.lat,
                    this.props.geometry.location.lng)
      .then( (res) => {
        that.setState({ weather: res });
      });
  }

  render() {
    const marker = {
       coordinate: {latitude: this.props.geometry.location.lat,
                    longitude: this.props.geometry.location.lng},
      title: this.props.name,
      image: require('../../../img/trekking-128.png')
    };
    const region = {
      latitude: this.props.geometry.location.lat,
      longitude: this.props.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };

    return (
      <View style={styles.rowContainer}>
        <MapView.Animated
          style={styles.map}
          region={region}
          onRegionChange={this.onRegionChange}
        >
          <MapView.Callout />
          <MapView.Marker
            style={styles.pinImage}
            coordinate={marker.coordinate}
            title={marker.title}
          />
        </MapView.Animated>
        <View style={styles.tempInfo} >
          <Text style={styles.tempTitle}> Current Conditions </Text>
          { !!(this.state.weather.currently) ?
            <View style={styles.weather}>
              <View>
                <WeatherIcon icon={this.state.weather.currently.icon} size={40} />
              </View>
              <Text style={styles.text}>
                {this.state.weather.currently.summary}
              </Text>
              <Text style={styles.text}>
                Temperature: {Math.floor(this.state.weather.currently.temperature)} &#x2109;
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <WeatherIcon icon='sunrise' size={25} style={{ marginRight: 10 }} />
                <Text style={styles.text}>
                  {time.formatted12HourTime(this.state.weather.daily.data[0].sunriseTime)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <WeatherIcon icon='sunset' size={25} style={{ paddingRight: 5 }} />
                <Text style={styles.text}>
                  {time.formatted12HourTime(this.state.weather.daily.data[0].sunsetTime)}
                </Text>
              </View>
            </View>
            : <View />}
        </View>
      </View>
    )
  }
}