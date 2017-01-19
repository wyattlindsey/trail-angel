import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import Row from './reviewListItem.component';
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
  },
  textContainer: {
    marginBottom: 20,
    padding: 20,
  },
  map: {
    flex: 1,
  },
  title: {
    color: '#433E51',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10
  },
  location: {
    color: '#786048',
    paddingBottom: 20
  },
  reviewtitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E3E0D7'
  }
});


export default class TraillistDetail extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds,
    };
  }

  componentDidMount() {
    if (this.props.reviews !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.props.reviews)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.reviews)
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
    let address = this.props.formatted_address;
    let trail_address = address.replace(/, /g, '\n');

    let marker = {
      coordinate: {latitude: this.props.geometry.location.lat,
                    longitude: this.props.geometry.location.lng},
      title: this.props.name,
      description: this.props.reviews === undefined ? '' : this.props.reviews[0].text
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
            <Text style={styles.location}>{trail_address}</Text>
            <View style={styles.separator}/>
            <Text style={styles.reviewtitle}>Reviews: </Text>
            <ListView  automaticallyAdjustContentInsets={false}
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