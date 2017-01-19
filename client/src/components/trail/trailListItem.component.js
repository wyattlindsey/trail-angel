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
import temperature from '../../utils/temperature';

const styles = StyleSheet.create({
 rowContainer: {
    flexDirection: 'row',
    padding: 20,
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
  leftColumn: {
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
    height: 1,
    backgroundColor: '#E3E0D7'
  },
  distance: {
    flex: 1,
    flexDirection: 'column'
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
  }

  componentWillReceiveProps(nextProps) {
    // const isFavorite = nextProps.collections !== undefined && nextProps.collections.indexOf('favorites') !== -1;
    // this.setState({
    //   isFavorite
    // });

    // const isFavorite = nextProps.favorites !== undefined && _.find(nextProps.favorites, { id: nextProps.id });
    // this.setState({
    //   isFavorite
    // });

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
    const FavoriteIcon = this.state.isFavorite ?
                          <Icon name='star' size={20} color='darkgreen' /> :
                          <Icon name='star-o' size={20} color='darkgreen' />;
    return (
        <View>

          <TouchableHighlight onPress={this._selectTrail.bind(this)}
                              underlayColor='#ffffff'>
          <View>
            <View style={styles.rowContainer}>
              <View style={styles.leftColumn}>

                <Image source={{uri: this.props.photoThumbnailUrl}} style={styles.photo} />
                <TouchableHighlight onPress={this._toggleFavorite.bind(this)}
                                    style={styles.favorite}
                                    underlayColor='#ffffff'>
                  {FavoriteIcon}
                </TouchableHighlight>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{this.props.name}</Text>
                <Text style={styles.location}> {this.props.vicinity} </Text>
                {this.props.rating === undefined ? <View /> :
                  <Text style={styles.rating}> Rating: {this.props.rating} </Text>
                }
                <Text style={styles.description}
                      numberOfLines={0}>{this.props.snippet_text}</Text>
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

                  {/* Display activity monitor until icon is loaded from api.  If no icon is ever received */}
                  {/* after a timeout, display nothing */}
                  {this.state.weather ? <View>
                                          <TouchableHighlight onPress={this._handlePressWeather.bind(this)}
                                                              underlayColor='#ffffff'
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
                                                {`${Math.round(Number(this.state.weather.currently.temperature))}°F`}
                                              </Text>
                                            </View>
                                          </TouchableHighlight>
                                        </View>
                                      :
                                        this.state.weatherTimeout ?
                                          <View /> :
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
            <View style={styles.separator}/>
            </View>
          </TouchableHighlight>
        </View>
    );
  }
}

