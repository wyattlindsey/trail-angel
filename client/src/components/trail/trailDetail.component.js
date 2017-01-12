import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import TrailMap from './map.component';

const styles = StyleSheet.create({
 rowContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 65,
  },
  mapContainer: {
    height: 200,
    // borderWidth: 2,
    // borderColor: 'steelblue',
  },
  textContainer: {
    height: 150,
    padding: 20,
    
    // borderWidth: 2,
    // borderColor: 'steelblue',
  },
  reviewContainer: {
    padding: 20,
    // borderWidth: 2,
    // borderColor: 'steelblue',
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
  row: {
    padding: 15,
    marginBottom: 5,
    // backgroundColor: 'skyblue',
  },
    reviewtitle: {
    color: '#3D728E',
    fontSize: 16,
    fontWeight: '600'
  },
  review: {
    color: '#484830',
    fontSize: 14,
    lineHeight: 15,
    marginBottom: 20,
    textAlign: 'left',
  },


});

// Row data (hard-coded)
const rows = [
  {id: 0, name: 'John Doe', ratings: '***', snippet_text: 'This is a difficult terrain, so watch out.'},
  {id: 1, name: 'Mary ', ratings: '*****', snippet_text: 'This is a difficult terrain, so watch out.'},
  {id: 2, name: 'Bill ', ratings: '****', snippet_text: 'This is a difficult terrain, so watch out.'},
  {id: 3, name: 'Steve', ratings: '*****', snippet_text: 'This is a difficult terrain, so watch out.'},
];

// Row comparison function
const rowHasChanged = (r1, r2) => r1.id !== r2.id

// DataSource template object
const ds = new ListView.DataSource({rowHasChanged})



export default class TraillistDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dataSource: ds.cloneWithRows(rows)
  }

  renderRow = (rowData) => {
    return (
      <View style={styles.row}>
        <Text>{rowData.name}</Text>
        <Text style={styles.location}> {rowData.ratings} </Text>
        <Text style={styles.review} numberOfLines={10}>{rowData.snippet_text}</Text>
      </View>
    )
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
            <Text style={styles.location}> {this.props.location.city} </Text>
            <Text style={styles.description} numberOfLines={10}>{this.props.snippet_text}</Text>
          </View>
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewtitle}>Reviews: </Text>
            <ListView
              style={styles.container}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </View>
        </View>
    );
  }
}




