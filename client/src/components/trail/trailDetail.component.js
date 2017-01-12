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
  {id: 0, name: 'Katie R.', ratings: '***', snippet_text: "At 8.44 miles and just shy of a 1200 foot elevation gain, Ramona Falls is a great hike for almost any fitness level. And the number of cars parked at the trailhead makes that clear. Don't be deterred! The trail is a loop so hiking it without feeling like part of a herd is easily accomplished."},
  {id: 1, name: 'Kolten L.', ratings: '*****', snippet_text: "My favorite hike I've done! Really enjoyed this one. I recommend taking the path to the left over the one to the right (alternative). Lots to see this way and you can loop around to come back on the other path which is a lot less scenic but a straighter shot back to the parking lot. Just a little over 7 miles round trip. The hike really had everything- very diverse scenery. Caves would have really topped it off but I can't get too greedy. Recommend this hike to anyone that lives in or visits Oregon!"},
  {id: 2, name: 'Ann L.', ratings: '****', snippet_text: "We went to Ramona Falls on Sat 7/6/13, it's in the Mt Hood National Forest and you really need to follow the directions on the website or ask the ranger because it's in the middle of nowhere & you might not find it otherwise."},
  {id: 3, name: 'Dave C.', ratings: '*****', snippet_text: "A roughly 7 mile hike that can be done as either a out-and back or as a loop.  The loop is much, much prettier and you get two different experiences.  Heading up you walk along the Sandy River which, surprise, surprise, is sometimes kind of brownish because of all the volcanic ash in it's flow. Great views of the river course and all the sediments going back who knows how long ago. "},
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




