'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import MapView from 'react-native-maps';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/FontAwesome';

import trailAngelApi from '../../api/trailangel-api';
import googleApi from '../../api/google-api';
import trailCalc from '../../utils/trail-calculations';
import colors from '../style/colors';
import dimensions from '../style/dimensions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 1;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      elevation: 0,
      estimatedTime: 0,
      region: {
        latitude: this.props.geometry.location.lat,
        longitude: this.props.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [{
        coordinate: {
          latitude: this.props.geometry.location.lat,
          longitude: this.props.geometry.location.lng
        },
        key: '0',
      }],
      displayMiles: true,
      displayFeet: true,
      mapType: 'terrain',
      dimensions: {
        width: 0,
        height: 0
      },
    };
    this.onMapPress = this.onMapPress.bind(this);
  }

  componentDidMount() {
    this.getMappedTrail();
  }

  getMappedTrail(trailId, options) {
    let savedMarkers;
    trailAngelApi.getGeo(this.props.id, this.props.userId)
      .then(data => {
        if (data.length > 0) {
          id = 0;
          savedMarkers = data.map(coordinate => {
            return {
              coordinate: {
                latitude: parseFloat(coordinate[1]),
                longitude: parseFloat(coordinate[0]),
              },
              key: `${id++}`,
            };
          });
          this.setState({
            markers: savedMarkers
          }, this.getTotalDistance);
        }
      })
      .catch(err => {
        console.error("Failed to get mapped trail: ", err);
      });
  }

  getElevationGain() {
    googleApi.getElevation(this.state.markers)
      .then((elevationGain) => {
        this.setState({
          elevation: elevationGain
        });
      });
  }

  getTotalDistance() {
    this.getElevationGain();
    return trailAngelApi.getDistanceMappedTrail(this.props.id, this.props.userId)
      .then((distance) => {
        this.setState({
          distance: distance
        });
      });
  }

  saveMappedTrail(removedPin = false) {
    const trailId = this.props.id;
    const pins = this.state.markers.map(marker => {
      return [marker.coordinate.longitude, marker.coordinate.latitude];
    });
    const options = {
      userId: this.props.userId,
      pins: pins
    };
    if (!removedPin) {
      trailAngelApi.addGeo(trailId, options)
        .then(response => {
          this.getTotalDistance();
          this.getElevationGain();
        })
        .catch(err => {
          Alert.alert('There was an error saving your trail: ', err);
        });
    } else {
      trailAngelApi.updateGeo(trailId, options)
        .then(response => {
          this.getTotalDistance();
          this.getElevationGain();
        })
        .catch(err => {
          Alert.alert('There was an error saving your trail: ', err);
        });
    }

  }

  deleteMappedTrail() {
    const options = {
      userId: this.props.userId
    };
    trailAngelApi.removeGeo(this.props.id, options)
      .then(response => {
        this.resetTrail();
      })
      .catch(err => {
        console.error('Error deleting mapped trail: ', err);
      });
  }

  resetTrail() {
    id = 0;
    this.setState({
      markers: [{
        coordinate: {
          latitude: this.props.geometry.location.lat,
          longitude: this.props.geometry.location.lng
        },
        key: `${id++}`,
      }],
      distance: 0,
      elevation: 0,
      estimatedTime: 0
    });

  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `${id++}`,
        },
      ],
    }, this.saveMappedTrail);
  }

  onDragEnd(key, e) {
    let index;
    this.state.markers.forEach((marker, i) => {
      if (marker.key === key) {
        index = i;
      }
    });
    const markers = this.state.markers.slice();
    markers.splice(index, 1, {
      coordinate: e.nativeEvent.coordinate,
      key: key,
    });
    this.setState({
      markers: [
        ...markers,
      ],
    });
    this.saveMappedTrail();
  }

  toggleMilesKilometers() {
    this.setState({
      displayMiles: !this.state.displayMiles
    });
  }

  toggleFeetMeters() {
    this.setState({
      displayFeet: !this.state.displayFeet
    });
  }

  toggleSatelliteMode() {
    if (this.state.mapType === 'hybrid') {
      this.setState({
        mapType: 'none'
      });
    } else {
      this.setState({
        mapType: 'hybrid'
      });
    }
  }

  toggleTerrainMode() {
    if (this.state.mapType === 'terrain') {
      this.setState({
        mapType: 'none'
      });
    } else {
      this.setState({
        mapType: 'terrain'
      });
    }
  }

  onLayoutChange = (e) => {
    this.setState({
      dimensions: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height
      }
    });
  }

  render() {
    const coordinates = this.state.markers.map( (marker) => {
      return marker.coordinate;
    });
    const distance = this.state.distance;
    const elevation = this.state.elevation;
    const displayFeet = this.state.displayFeet;
    const displayMiles = this.state.displayMiles;

    const orientation = this.state.dimensions.width < this.state.dimensions.height ?
      'portrait' : 'landscape';
    
    return (
      <View style={styles.container}
            onLayout={this.onLayoutChange}
      >
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          mapType={this.state.mapType}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
        >
          {this.state.markers.map((marker, index) => {
            if (index === 0) {
              return (
                <MapView.Marker draggable
                                image={require('../../../img/trekking-128.png')}
                                title={marker.key}
                                key={marker.key}
                                coordinate={marker.coordinate}
                                onDragEnd={this.onDragEnd.bind(this, marker.key)}
                />
              )
            } else {
              return (
                <MapView.Marker draggable
                                image={require('../../../img/red-pin-small.png')}
                                title={marker.key}
                                key={marker.key}
                                coordinate={marker.coordinate}
                                onDragEnd={this.onDragEnd.bind(this, marker.key)}
                />
              )
            }
          })}

          {coordinates.length > 1 ? this.state.markers.map(polyline => (
            <MapView.Polyline
              key={polyline.key}
              coordinates={coordinates}
              strokeColor="#228b22"
              strokeWidth={4}
              lineCap='round'
              lineJoin='round'
            />
          )) : null}
        </MapView>

        <View style={{
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'transparent',
            marginTop: dimensions.navHeight(orientation) + 10,
            height: 32,
            flexDirection: 'row'
          }}>
            <TouchableOpacity
              onPress={this.toggleMilesKilometers.bind(this)}
              style={styles.bubble}
            >
              <Text>
                {displayMiles ? `${distance.toPrecision(2)} mi` :
                  `${(trailCalc.convertToKm(distance)).toPrecision(2)} km`}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggleFeetMeters.bind(this)}
              style={styles.bubble}
            >
              <Text>
                {displayFeet ? `${Math.round(trailCalc.convertToFeet(elevation))} ft` :
                  `${Math.round(elevation)} m`}
              </Text>
            </TouchableOpacity>
            <View style={styles.bubble}>
              <Text>{trailCalc.calcEstimatedTime(elevation, distance)}</Text>
            </View>
          </View>
          <View style={{
                  position: 'absolute',
                  top: this.state.dimensions.height - 64,
                  left: 0,
                  right: 0,
                  bottom: 0
                }}
          >
          <View style={{
                  height: 32,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
          >
            <TouchableOpacity
              onPress={() => {
                this.state.markers.pop();
                id--;
                this.setState({
                  markers: this.state.markers
                }, this.saveMappedTrail.bind(this, true));
              }}
              style={styles.bubble}
            >
              <Text>Remove Last Pin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Are you sure?',
                  'This will delete your mapped trail permanently.',
                  [
                    {text: 'Cancel'},
                    {text: 'OK', onPress: () => this.deleteMappedTrail()},
                  ]
                )}
              }
              style={styles.bubble}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bubble}
                              onPress={this.toggleSatelliteMode.bind(this)}
            >
              <Icon name='globe'
                    size={20}
                    color={colors.darkgray}
                    style={{
                      opacity: this.state.mapType === 'hybrid' ? 1.0 : 0.5
                    }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bubble}
                              onPress={this.toggleTerrainMode.bind(this)}
            >
              <FoundationIcon name='mountains'
                              size={20}
                              color={colors.darkgray}
                              style={{
                                opacity: this.state.mapType === 'terrain' ? 1.0 : 0.5
                              }}
              />
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center'
  },

  map: {
    ...StyleSheet.absoluteFillObject
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 8,
    paddingTop: 6,
    paddingBottom: 3,
    borderRadius: 5,
    marginRight: 5
  }
});