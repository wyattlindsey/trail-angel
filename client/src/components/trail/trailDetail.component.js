import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import TrailMap from './map.component';
import Row from './reviewListItem.component';


const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 65,
  },
  mapContainer: {
    height: 200,
  },
  textContainer: {
    height: 80,
    marginBottom: 20,
    padding: 20,
  },
  
  map: {
    flex: 1,
  },
  title: {
    color: '#3D728E',
    fontSize: 16,
    fontWeight: '600'
  },
  location: {
    color: '#786048'
  },
  reviewtitle: {
    padding: 20,
    color: '#333333',
    fontSize: 16,
    fontWeight: '600'
  },
  separator: {
    height: 1,
    backgroundColor: '#E3E0D7'
  },
});


export default class TraillistDetail extends React.Component {
  constructor(props) {
    super(props);

    // DataSource template object
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     const blob = this.props.reviews;

    this.state = {
      dataSource: ds.cloneWithRows(blob),
    }

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
      coordinate: {latitude: this.props.geometry.location.lat,
                    longitude: this.props.geometry.location.lng},
      title: this.props.name,
      description: this.props.reviews["0"].text
    };
    let region = {
      latitude: this.props.geometry.location.lat,
      longitude: this.props.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    return (
        <View style={styles.rowContainer}>
          <TouchableHighlight onPress={this._selectMap.bind(this)}>
            <View style={styles.mapContainer}>
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
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.location}> {this.props.formatted_address} </Text>
          </View>
          <View style={styles.separator}/>

          <Text style={styles.reviewtitle}>Reviews: </Text>
          <ListView  automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data}/>}
            renderSeparator={(sectionId, rowId) => 
                  <View key={rowId} style={styles.separator} />}
          />
        </View>
    );
  }
}

/*
<ListView  style={styles.reviewContainer}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data}/>}
            renderSeparator={(sectionId, rowId) => 
                  <View key={rowId} style={styles.separator} />}
          />
*/