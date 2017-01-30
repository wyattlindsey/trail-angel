'use strict';

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView } from 'react-native';
import * as _ from 'lodash';

import Row from '../trail/reviewListItem.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from '../map/Map.component';
import Dashboard from '../../archive/favorite/favoriteMapDashboard.component';
import colors from '../colors';


export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds,
      address: ''
    };
  }

  componentDidMount() {
    console.log(this.props.photoLargeUrl);

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

  _toggleFavorite() {
    if (!this.state.isFavorite) {
      this.props.actions.addFavorite(this.props.id);
      this.setState({
        isFavorite: true
      });
    } else {
      this.props.actions.removeFavorite(this.props.id);
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
      component: Map,
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
      longitudeDelta: 0.0421
    };

    const FavoriteIcon = this.state.isFavorite ?
      <Icon name='star' size={30} color={colors.warning} /> :
      <Icon name='star-o' size={30} color={colors.warning} />;

    const MapIcon = this.state.isFavorite ?
      <Icon name='map' size={20} color={colors.mapColor} style={{ opacity: 1.0 }} /> :
      <Icon name='map' size={20} color={colors.mapColor} style={{ opacity: 0.6 }} />
    return (
      <View style={styles.rowContainer}>
        <Image
          style={{ flex: 1}}
          source={{ uri: this.props.photoLargeUrl }}
        />
        <View style={styles.textContainer}>
          <View style={styles.leftCol}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.location}>{this.state.address}</Text>
          </View>
          <View style={styles.rightCol}>
            <TouchableHighlight onPress={this._toggleFavorite.bind(this)}
                                underlayColor='white'
                                style={{ marginRight: 30, marginLeft: 100 }}>
              {FavoriteIcon}
            </TouchableHighlight>
            <TouchableHighlight onPress={this._handleGoToMapDashboard.bind(this)}
                                underlayColor='white'
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
    color: colors.darkgreen,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10
  },
  location: {
    color: colors.darktan,
    paddingBottom: 20
  },
  reviewtitle: {
    color: colors.darkgray,
    fontSize: 16,
    fontWeight: '400',
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.beige
  }
});
