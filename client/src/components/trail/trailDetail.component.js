import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import TrailMap from './map.component';

const styles = StyleSheet.create({

  textContainer: {
    flexDirection: 'row',
    padding: 20,
    flex: 1
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
  map: {
    flexGrow: 1,
    height: 250
  },
});

export default class TraillistDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  _selectMap(e) {
    this.props.navigator.push({
      title: 'Map View',
      component: TrailMap,
      passProps: {
        ...this.props
      }
    });
  }

  render() {
    let marker = {
      coordinate: this.props.location.coordinate,
      title: this.props.name,
      description: this.props.snippet_text
    };
    let region = {
      latitude: this.props.location.coordinate.latitude,
      longitude: this.props.location.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    return (
      <View style={{marginTop: 100 }}>
        <View>
          <TouchableHighlight onPress={this._selectMap.bind(this)}>
            <View>
              <MapView
                style={styles.map}
                region={region}
                onRegionChange={this.onRegionChange}
              >
                <MapView.Marker
                  coordinate={marker.coordinate}
                  title={marker.title}
                />
              </MapView>
            </View>
          </TouchableHighlight>
          <Text>{this.props.name}</Text>
          <Text>{this.props.rating}</Text>
          <Text numberOfLines={0}>{this.props.snippet_text}</Text>
        </View>
      </View>
    );
  }
}




