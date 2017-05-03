'use strict';

import React from 'react';
import * as _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/FontAwesome';

import { routes } from '../../router';

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

    dataApi.google.getDistance2Points(this.props.userLocation.coords, {
      latitude: this.props.geometry.location.lat ,
      longitude: this.props.geometry.location.lng
    })
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
      index: routes.dailyWeatherForecast,
      passProps: {
        forecast: this.state.weather,
        navigator: this.props.navigator
      }
    });
  }

  _selectItem() {
    this.props.navigator.push({
      title: 'Detail',
      component: Details,
      index: routes.details,
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

    return (
      <View>
        <TouchableHighlight onPress={this._selectItem.bind(this)}
                            underlayColor='white'>
          <Grid>
            <Col size={25}
                 style={{
                   alignItems: 'center',
                   padding: 10
                 }}
            >
              <Row>
                <Image source={{uri: this.props.photoThumbnailUrl}}
                       style={{
                         borderRadius: 30,
                         width: 60,
                         height: 60,
                         marginBottom: 10
                       }}
                />
              </Row>
              <Row>
                <TouchableHighlight onPress={this._toggleFavorite.bind(this)}
                                    underlayColor='white'>
                  <View>{FavoriteIcon}</View>
                </TouchableHighlight>
              </Row>
            </Col>
            <Col size={75}
                 style={{
                   paddingTop: 10,
                   marginLeft: 10,
                   marginRight: 10,
                   alignItems: 'center'
                }}
            >
              <Text style={{
                fontWeight: '500',
                fontSize: 15,
                textAlign: 'center',
                marginBottom: 5,
                color: colors.darkgreen
              }}>
                {this.props.name}
              </Text>
              <Text style={{
                color: colors.darktan,
                marginBottom: 5,
                textAlign: 'center'
              }}>
                {this.state.vicinity}
              </Text>
              {this.props.rating === undefined ? <View /> :
                <Text style={{ color: colors.peagreen }}>
                  Rating: {this.props.rating}
                </Text>
              }
            </Col>
            <TouchableHighlight onPress={this._handlePressWeather.bind(this)}
                                underlayColor='white'>
              <Col size={25}
                   style={{
                     alignItems: 'center',
                     padding: 10
                   }}
              >
                <Row>
                  <Text style={{ color: colors.darkgreen }}>
                    {this.state.distance ? this.state.distance : ''}
                  </Text>
                </Row>
                <Row>
                  {/* Display activity monitor until icon is
                   loaded from api.  If no icon is ever received */}
                  {/* after a timeout, display nothing */}
                  {this.state.weather ?
                    <View>
                      <View style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              opacity: 0.8
                            }}
                      >
                        <WeatherIcon icon={this.state.weather.currently.icon}
                                     color={colors.weatherIconColor}
                                     size={30}
                                     style={{
                                       paddingLeft: 8
                                     }}
                        />
                        <Icon name='chevron-right'
                              color={colors.seafoam}
                              style={{
                                marginLeft: 8
                              }}
                        />
                      </View>
                      <Text style={{
                              color: colors.seafoam,
                              fontSize: 11,
                              fontWeight: 'bold',
                              paddingLeft: 8
                            }}
                      >
                        {`${Math.round(Number(
                          this.state.weather.currently.temperature))
                        }°F`}
                      </Text>
                    </View>
                    :
                    this.state.weatherTimeout ?
                      <View /> :
                      <ActivityIndicator size='small'
                                         color={colors.seafoam}
                                         style={{ opacity: 0.8 }}
                      />
                  }
                </Row>
              </Col>
            </TouchableHighlight>
          </Grid>
        </TouchableHighlight>
      </View>
    );
  }
}
