'use strict';

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import * as _ from 'lodash';

import Row from './reviewListItem.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import TrailMap from './map.component';
import Dashboard from '../favorite/favoriteMapDashboard.component';


const styles = StyleSheet.create({
  rowContainer: {
    marginTop: 65,
  },
  mapContainer: {
    height: 200,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  leftCol: {
    width: 100,
  },
  rightCol: {
    width: 200,
    top: 20,
    flexDirection: 'row'
  },
  map: {
    flex: 1,
  },
  title: {
    color: '#2f5e4e',
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
    fontWeight: '400',
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
      address: ''
    };
  }

  componentDidMount() {
    if (this.props.reviews !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.props.reviews)
      });
    }

    if (this.props.formatted_address !== undefined) {
      this.setState({
        address: this.props.formatted_address.replace(/, /g, '\n')
      });
    }

    const isFavorite = this._checkIsFavorite(this.props.id, this.props.favorites);
    this.setState({
      isFavorite
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.reviews)
      });
    }

    if (this.props.formatted_address !== undefined) {
      this.setState({
        address: this.props.formatted_address.replace(/, /g, '\n')
      });
    }

    const isFavorite = this._checkIsFavorite(this.props.id, nextProps.favorites);

    this.setState({
      isFavorite
    });
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

  _toggleFavorite() {
    if (!this.state.isFavorite) {
      this.props.addFavorite(this.props.id);
      this.setState({
        isFavorite: true
      });
    } else {
      this.props.removeFavorite(this.props.id);
      this.setState({
        isFavorite: false
      });
    }
  }

  _handleGoToMapDashboard() {
    if (!this.state.isFavorite) {
      return;
    }
    this.props.navigator.push({
      title: 'Dashboard',
      component: Dashboard,
      passProps: {
        ...this.props
      }
    });
  }

  _checkIsFavorite(id, favorites) {
    return _.findIndex(favorites, { id }) !== -1;
  }

  render() {
    let marker = {
      coordinate: { latitude: this.props.geometry.location.lat,
                    longitude: this.props.geometry.location.lng},
      title: this.props.name,
      description: this.props.reviews === undefined ? '' : this.props.reviews[0].text
    };

    let region = {
      latitude: this.props.geometry.location.lat,
      longitude: this.props.geometry.location.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421  //comment
    };

    const FavoriteIcon = this.state.isFavorite ?
      <Icon name='star' size={30} color='#E56452' /> :
      <Icon name='star-o' size={30} color='#E56452' />;

    const MapIcon = this.state.isFavorite ?
      <Icon name='map' size={20} color='#f7d548' style={{ opacity: 1.0 }} /> :
      <Icon name='map' size={20} color='#f7d548' style={{ opacity: 0.6 }} />

    return (
        <View style={styles.rowContainer}>
          <TouchableHighlight onPress={this._selectMap.bind(this)}>
            <View style={styles.mapContainer}>
              <MapView pitchEnabled={false} rotateEnabled={false} scrollEnabled={false} zoomEnabled={false}
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
            <View sytle={styles.leftCol}>
              <Text style={styles.title}>{this.props.name}</Text>
              <Text style={styles.location}>{this.state.address}</Text>
            </View>
            <View style={styles.rightCol}>  
              <TouchableHighlight onPress={this._toggleFavorite.bind(this)}
                                  underlayColor='#ffffff'
                                  style={{ marginRight: 30, marginLeft: 100 }}>
                {FavoriteIcon}
              </TouchableHighlight>
              <TouchableHighlight onPress={this._handleGoToMapDashboard.bind(this)}
                                  underlayColor='#ffffff'
                                  disabled={!this.state.isFavorite}>
                {MapIcon}
              </TouchableHighlight>
            </View>    
          </View>
              <View style={styles.separator}/>
              <Text style={styles.reviewtitle}>Reviews: </Text>
            <ListView automaticallyAdjustContentInsets={false}
              dataSource={this.state.dataSource}
              renderRow={(data) => <Row {...data}/>}
              renderSeparator={(sectionId, rowId) => 
                <View key={rowId} style={styles.separator} />}
            />
        </View>
    );
  }
}