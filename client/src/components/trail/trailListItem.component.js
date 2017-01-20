'use strict';

import React from 'react';
import * as _ from 'lodash';
import {  View,
          Text,
          StyleSheet,
          Image,
          TouchableHighlight,
          ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherIcon from '../weather/weather-icon.component';
import DailyWeatherForecast from '../weather/weather-forecast.component';
import Details from './trailDetail.component';
import dataApi from '../../api';

const styles = StyleSheet.create({
 rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    padding: 20,
    width: 90,
    height: 90,
    alignItems: 'center',
  },
  middleColumn: {
    padding: 20,
    width: 190,
    height: 150,
  },
  rightColumn: {
    padding: 20,
    width: 100,
    height: 150,
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    color: '#2f5e4e',
    width: 200,
  },
  photo: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  location: {
    color: '#786048'
  },
 rating: {
    color: '#727B24',
    paddingTop: 10
  },
  description: {
    lineHeight: 20,
    fontSize: 14,
    color: '#484830',
    textAlign: 'left',
    marginTop: 8,
  },
  favorite: {
    marginTop: 20,
    width: 20,
    height: 20,

  },
  distance: {
    paddingTop: 2,
    paddingBottom: 15
  },
  weatherBlock: {
    backgroundColor: 'red'
  } 
});

export default class TraillistItem extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      isFavorite: null,
      distance: null,
      weather: null,
      vicinity: '',
      weatherTimeout: false,       // helps determine when to give up on weather data,
      image: null                  // stop displaying the spinner and show a default icon
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const isFavorite = this._checkIsFavorite(this.props.id, this.props.favorites);
    this.setState({
      isFavorite
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState({
          weatherTimeout: true
        });
      }
    }, 4000);

    dataApi.google.getDistance2Points(this.props.userLocation.coords,
      { latitude: this.props.geometry.location.lat , longitude: this.props.geometry.location.lng})
      .then((distance) => {
        if (this._isMounted && distance) {
          this.setState({
            distance: distance.text
          });
        }
      })
      .catch((err) => {
        console.error('Error getting distance for component: ', err);
      });

    dataApi.weather(this.props.geometry.location.lat,
                    this.props.geometry.location.lng)
      .then((weather) => {
        if (this._isMounted && weather) {
          this.setState({
            weather
          });
        }
      })
      .catch((err) => {
        console.error('Error getting weather for component: ', err);
      });

    if (this.props.vicinity !== undefined) {
      this.setState({
        vicinity: this.props.vicinity.replace(/, /g, '\n')
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const isFavorite = this._checkIsFavorite(this.props.id, nextProps.favorites);

    this.setState({
      isFavorite
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _toggleFavorite() {
    if (!this.state.isFavorite) {
      this.props.addFavorite(this.props.id);
      this.setState({
        isFavorite: true
      });
    } else {
      this.props.removeFavorite(this.props.id);
      this.setState({
        isFavorite: false
      });
    }
  }
  
  _handlePressWeather() {
    this.props.navigator.push({
      title: 'Daily Forecast',
      component: DailyWeatherForecast,
      passProps: {
        ...this.state.weather,
        forecast: this.state.weather,
        navigator: this.props.navigator,
      }
    })
  }

  _selectTrail() {
    this.props.navigator.push({
      title: 'Trail Detail',
      component: Details,
      passProps: {
        ...this.props
      }
    }); 
  }

  _checkIsFavorite(id, favorites) {
    return _.findIndex(favorites, { id }) !== -1;
  }

  render() {
    const FavoriteIcon = this.state.isFavorite ? <Icon name='star' size={20} color='#E56452' /> : <Icon name='star-o' size={20} color='#E56452' />;

    return (
      <View>
        <TouchableHighlight onPress={this._selectTrail.bind(this)} underlayColor='#ffffff'>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.leftColumn}>
                <Image source={{uri: this.props.photoThumbnailUrl}} style={styles.photo} />
                <TouchableHighlight onPress={this._toggleFavorite.bind(this)}
                                    style={styles.favorite}
                                    underlayColor='#ffffff'>
                  <View>{FavoriteIcon}</View>
                </TouchableHighlight>
              </View>
              <View style={styles.middleColumn}>
                <Text style={styles.title}>{this.props.name}</Text>
                
                <Text style={styles.location}>{this.state.vicinity}</Text>
                {this.props.rating === undefined ? <View /> :
                  <Text style={styles.rating}>Rating: {this.props.rating} </Text>
                }
              </View>
              <View style={styles.rightColumn}>
               
                <Text style={styles.distance}>
                  {this.state.distance ? this.state.distance : ''}
                </Text>
                <View>
                  {/* Display activity monitor until icon is
                      loaded from api.  If no icon is ever received */}
                  {/* after a timeout, display nothing */}
                  {this.state.weather ? 
                    <View>
                      <TouchableHighlight onPress={this._handlePressWeather.bind(this)} underlayColor='#ffffff'>
                        <View>
                          <WeatherIcon icon={this.state.weather.currently.icon}
                                       color='#52B3D9'
                                       size={30}
                                       style={{
                                         opacity: 0.8
                                     }}
                          />
                          <Text style={styles.weather}>
                            {`${Math.round(Number(this.state.weather.currently.temperature))}°F`}
                          </Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    :
                    this.state.weatherTimeout ?
                    <View /> :
                    <ActivityIndicator  size='small' color='darkgreen' style={{ opacity: 0.8 }} />
                  }
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

