import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import MapView from 'react-native-maps';
import trailAngelApi from '../../api/trailangel-api';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 1;

export default class CustomMarkers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: this.props.location.coordinate.latitude,
        longitude: this.props.location.coordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [{
          coordinate: {
            latitude: this.props.location.coordinate.latitude,
            longitude: this.props.location.coordinate.longitude
          },
          key: '0',
        }],
    };
    this.onMapPress = this.onMapPress.bind(this);
  }
  componentDidMount() {
    this.getMappedTrail();
  }
  getMappedTrail(trailId, options) {
    var savedMarkers;
    trailAngelApi.getGeo(this.props.id, this.props.userId)
    .then(data => {
      console.log(data);
      if (data.length > 0) {
        var key = 0;
        savedMarkers = data.map(coordinate => {
          console.log(coordinate[0], coordinate[1]);
          return {
            coordinate: {
              latitude: parseFloat(coordinate[1]),
              longitude: parseFloat(coordinate[0]),
            },
            key: `foo${key++}`,
          };
        });
        console.log(savedMarkers);
        this.setState({
          markers: savedMarkers
        });
      }
    })
    .catch(err => {
      console.error("Failed to get mapped trail: ", err);
    });
  }
  saveMappedTrail() {
    var trailId = this.props.id;
    var pins = this.state.markers.map(marker => {
      return [marker.coordinate.longitude, marker.coordinate.latitude];
    });
    var options = {
      userId: this.props.userId,
      pins: pins
    };
    trailAngelApi.addGeo(trailId, options)
    .then(response => {
      console.log(response.status);
      Alert.alert('Trail Saved!');
    })
    .catch(err => {
      Alert.alert('There was an error saving your trail: ', err);
    });
  }
  deleteMappedTrail() {
    var options = {
      userId: this.props.userId
    };
    trailAngelApi.removeGeo(this.props.id, options)
    .then(response => {
      console.log('Successfully deleted mapped trail: ', response);
      this.resetTrail();
    })
    .catch(err => {
      console.error('Error deleting mapped trail: ', err);
    })
  }
  resetTrail() {
    this.setState({
      markers: [{
          coordinate: {
            latitude: this.props.location.coordinate.latitude,
            longitude: this.props.location.coordinate.longitude
        },
        key: '0',
      }]
    });
  }
  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });
  }
  onDragEnd(key, e) {
    console.log(key);
    var index;
    this.state.markers.forEach((marker, i) => {
      if (marker.key === key) {
        index = i;
      }
    });
    var markers = this.state.markers.slice();
    markers.splice(index, 1, {
      coordinate: e.nativeEvent.coordinate,
      key: key,
    });
    console.log('These are the markers after drag end: ', markers, 'This is marker event info: ', e.nativeEvent, 'This is the index of the moved marker: ', index);

    this.setState({
      markers: [
        ...markers,
      ],
    });
  }
  render() {
    let trailheadCoordinate = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    };
    let coordinates = this.state.markers.map( (marker) => {
      return marker.coordinate;
    });
    return (
      <View style={styles.container}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={this.onMapPress}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker draggable
              title={marker.key}
              key={marker.key}
              coordinate={marker.coordinate}
              onDragEnd={this.onDragEnd.bind(this, marker.key)}
            />
          ))}
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
                this.state.markers.pop();
                this.setState({
                  markers: this.state.markers
                })
              }
            }
            style={styles.bubble}
          >
            <Text>Remove Last Pin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
                this.saveMappedTrail();
              }
            }
            style={styles.bubble}
          >
            <Text>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Are you sure?',
                'This will delete your mapped trail permanently.',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                  {text: 'OK', onPress: () => this.deleteMappedTrail()},
                ]
              )}
            }
            style={styles.bubble}
          >
            <Text>Delete</Text>
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
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
