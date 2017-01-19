import React from 'react';
import {  View,
          Text,
          StyleSheet,
          Image,
          TouchableHighlight,
          ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WeatherIcon from '../weather/weather-icon.component';
import WeatherForecast from '../weather/weather-forecast.component';
import Details from '../trail/trailDetail.component';
import Dashboard from './favoriteMapDashboard.component';

import dataApi from '../../api';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 15
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 50
  },
  title: {
    color: '#3D728E',
    fontSize: 16,
    fontWeight: '600'
  },
  photo: {
    height: 40,
    width: 40,
    marginRight: 20,
    borderRadius: 20,
  },
  favorite: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginTop: 80,
    opacity: 0.5
  },
  location: {
    color: '#786048'
  },
  rating: {
    color: '#909060'
  },
  description: {
    color: '#484830',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'left',
  },
  separator: {
    backgroundColor: '#E3E0D7'
  },
  distance: {
    // width: 100,
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'flex-end',
  },
  removeButton: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginTop: 80
  },
});

export default class FavoriteListItem extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      distance: null,
      weather: null
    };
  }

  componentDidMount() {
    this._isMounted = true;

    if (this.props.userLocation.coords.latitude === undefined ||
      this.props.geometry.location === undefined) {

      return;
    }

    dataApi.google.getDistance2Points(this.props.userLocation.coords,
                                      {
                                        latitude: this.props.geometry.location.lat,
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

    dataApi.weather(this.props.geometry.location.lat, this.props.geometry.location.lng)
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
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _handleRemoveFavorite() {
    this.props.removeFavorite(this.props.id);
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

  _handlePressWeather() {
    this.props.navigator.push({
      title: 'Daily Forecast',
      component: WeatherForecast,
      passProps: {
        ...this.state.weather,
        forecast: this.state.weather,
        navigator: this.props.navigator,
      }
    })
  }

  _handleGoToMapDashboard() {
    this.props.navigator.push({
      title: 'Dashboard',
      component: Dashboard,
      passProps: {
        ...this.props
      }
    });
  }

  render() {
    let view;
    if (this.props.geometry === undefined) {
      view = <View />
    } else {
      view =
      <View>
        <TouchableHighlight onPress={this._selectTrail.bind(this)}
                            underlayColor='#ffffff'>
          <View>
            <View style={styles.rowContainer}>
              <View>
                <Image source={{uri: this.props.photoUrl}} style={styles.photo} />
                <TouchableHighlight onPress={this._handleRemoveFavorite.bind(this)}
                                    style={styles.removeButton}
                                    underlayColor='#ffffff'>
                  <Icon name='minus-circle' size={20} color='darkgreen' />
                </TouchableHighlight>
                <TouchableHighlight onPress={this._handleGoToMapDashboard.bind(this)}
                                    style={styles.removeButton}
                                    underlayColor='#ffffff'>
                  <Icon name='map' size={20} color='darkgreen' />
                </TouchableHighlight>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{this.props.name}</Text>
                <Text style={styles.location}> {this.props.vicinity} </Text>
                {this.props.rating === undefined? <View /> :
                  <Text style={styles.rating}> Rating: {this.props.rating} </Text>
                }
                <Text style={styles.description} numberOfLines={0}>{this.props.snippet_text}</Text>
              </View>
              <View>
                <Text style={styles.distance}>
                  {this.state.distance ? this.state.distance : ''}
                </Text>
                <View style={{
                  padding: 5,
                  marginBottom: 20,
                  marginLeft: 5
                }}>
                  {this.state.weather ? <View>
                                          <TouchableHighlight onPress={this._handlePressWeather.bind(this)}
                                                              underlayColor='white'
                                          >
                                            <View>
                                              <WeatherIcon icon={this.state.weather.currently.icon}
                                                           color='darkgreen'
                                                           size={40}
                                                           style={{
                                                             opacity: 0.8
                                                           }}
                                              />
                                              <Text style={{
                                                textAlign: 'center',
                                                padding: 5,
                                                color: 'darkgreen'
                                              }}>
                                              {this.state.weather ?
                                                `${Math.round(Number(this.state.weather.currently.temperature))}°F` :
                                                ''
                                              }
                                              </Text>
                                            </View>
                                          </TouchableHighlight>
                                        </View>
                    :
                    <ActivityIndicator  size='small'
                                        color='darkgreen'
                                        style={{
                                          opacity: 0.8
                                        }}
                    />
                  }
                </View>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      </View>
    }
    return (
      <View>
        {view}
      </View>
    );

  }
}