import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
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
