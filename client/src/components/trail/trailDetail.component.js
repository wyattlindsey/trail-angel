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


export default class TraillistDetail extends React.Component {
  constructor(props) {
    super(props);

    // DataSource template object
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
    this.state = {
      dataSource: this.ds,
      initialPosition: null
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trails !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.trails)
      });
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
      // coordinate: this.props.location.coordinate,
      title: this.props.name,
      description: this.props.reviews.text
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
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewtitle}>Reviews: </Text>
            <ListView
              style={styles.container}
              dataSource={this.state.dataSource}
              renderRow={(data) => <Row {...data}/>}
              renderSeparator={(sectionId, rowId) => 
                    <View key={rowId} style={styles.separator} />}
            />
          </View>
        </View>
    );
  }
}
