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
import trailcalc from '../../utils/trail-calculations';
import colors from '../colors';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 1;

export default class CustomMarkers extends React.Component {
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
      mapType: 'terrain'
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

  render() {
    let trailheadCoordinate = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    };
    let coordinates = this.state.markers.map( (marker) => {
      return marker.coordinate;
    });
    let distance = this.state.distance;
    let elevation = this.state.elevation;
    let displayFeet = this.state.displayFeet;
    let displayMiles = this.state.displayMiles;
    return (
      <View style={styles.container}>
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
              )}})}
          {coordinates.length > 1 ? this.state.markers.map(polyline => (
            <MapView.Polyline
              key={polyline.key}
              coordinates={coordinates}
              strokeColor="#228b22"
              strokeWidth={4}
              lineCap='round'
              lineJoin='round'/>
          )) : null}
        </MapView>
        <View style={styles.infoContainer}>
          <TouchableOpacity
            onPress={this.toggleMilesKilometers.bind(this)}
            style={styles.topBubble}
          >
            <Text>
              {displayMiles ? `${distance.toPrecision(2)} mi` :
                `${(trailcalc.convertToKm(distance)).toPrecision(2)} km`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleFeetMeters.bind(this)}
            style={styles.topBubble}
          >
            <Text>
              {displayFeet ? `${Math.round(trailcalc.convertToFeet(elevation))} ft` :
                `${Math.round(elevation)} m`}
            </Text>
          </TouchableOpacity>
          <View style={styles.estimatedTime}>
            <Text>{trailcalc.calcEstimatedTime(elevation, distance)}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              this.state.markers.pop();
              id--;
              this.setState({
                markers: this.state.markers
              }, this.saveMappedTrail.bind(this, true));
            }
            }
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
                  style={{opacity: this.state.mapType === 'hybrid' ? 1.0 : 0.5}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bubble}
                            onPress={this.toggleTerrainMode.bind(this)}
          >
            <FoundationIcon name='mountains'
                            size={20}
                            color={colors.darkgray}
                            style={{opacity: this.state.mapType === 'terrain' ? 1.0 : 0.5}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
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
  },
  estimatedTime: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    width: 90
  },
  topBubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    width: 95,
    marginRight: 5,
    borderRadius: 5
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height - 200,
    backgroundColor: 'transparent'
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
});