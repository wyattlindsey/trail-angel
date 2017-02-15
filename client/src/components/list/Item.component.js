'use strict';

import React from 'react';
import * as _ from 'lodash';
import {  View,
          Text,
          StyleSheet,
          Dimensions,
          Image,
          TouchableHighlight,
          ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherIcon from '../weather/weather-icon.component';
import { DailyWeatherForecast } from '../weather/weather-forecast.component';
import Details from './Details.component';
import dataApi from '../../api';
import colors from '../style/colors';

export default class Item extends React.Component {
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
    const isFavorite = this._checkIsFavorite(nextProps.id, nextProps.favorites);

    this.setState({
      isFavorite
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _toggleFavorite() {
    if (!this.state.isFavorite) {
      this.props.actions.addFavorite(this.props.id);
      this.setState({
        isFavorite: true
      });
    } else {
      this.props.actions.removeFavorite(this.props.id);
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
        forecast: this.state.weather,
        navigator: this.props.navigator,
      }
    })
  }

  _selectItem() {
    this.props.navigator.push({
      title: 'Detail',
      component: Details,
      passProps: {
        ...this.props
      }
    });
  }

  _checkIsFavorite(id, favorites) {
    if (favorites.length > 0) {
      return _.findIndex(favorites, { id }) !== -1;
    }
  }

  render() {
    const FavoriteIcon = this.state.isFavorite ?  <Icon name='star'
                                                        size={20}
                                                        color={colors.warning}
                                                  />
                                                    :
                                                  <Icon name='star-o'
                                                        size={20}
                                                        color={colors.warning}
                                                  />;

    const { height, width } = Dimensions.get('window');

    return (
      <View>
        <TouchableHighlight onPress={this._selectItem.bind(this)}
                            underlayColor='white'>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.leftColumn}>
                <Image source={{uri: this.props.photoThumbnailUrl}} style={styles.photo} />
                <TouchableHighlight onPress={this._toggleFavorite.bind(this)}
                                    style={styles.favorite}
                                    underlayColor='white'>
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
                      <TouchableHighlight onPress={this._handlePressWeather.bind(this)}
                                          underlayColor='white'>
                        <View>
                          <WeatherIcon icon={this.state.weather.currently.icon}
                                       color={colors.weatherIconColor}
                                       size={30}
                                       style={{
                                         opacity: 0.8,
                                         paddingLeft: 8
                                       }}
                          />
                          <Text style={{
                                        paddingLeft: 8
                                      }}>
                            {`${Math.round(Number(this.state.weather.currently.temperature))}°F`}
                          </Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                    :
                    this.state.weatherTimeout ?
                      <View /> :
                      <ActivityIndicator  size='small' color={colors.seafoam} style={{ opacity: 0.8 }} />
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

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftColumn: {
    padding: 20,
    height: 90,
    alignItems: 'center',
  },
  middleColumn: {
    padding: 20,
    width: 150,
    height: 150,
  },
  rightColumn: {
    padding: 20,
    width: 80,
    height: 150,
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
    color: colors.darkgreen,
  },
  photo: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  location: {
    color: colors.darktan
  },
  rating: {
    color: colors.peagreen,
    paddingTop: 10
  },
  description: {
    lineHeight: 20,
    fontSize: 14,
    color: colors.darkgray,
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
    backgroundColor: colors.warning
  }
});