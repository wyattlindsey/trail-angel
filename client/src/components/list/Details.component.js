'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import * as _ from 'lodash';

import Reviews from './Reviews.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from '../map/Map.component';
import colors from '../style/colors';


export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: ''
    };
  }

  componentDidMount() {
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

    const MapIcon = <Icon name='map'
                          size={25}
                          color={colors.mapColor} />
    return (
      <View style={styles.details}>
        <Image
          style={styles.photo}
          source={{ uri: this.props.photoLargeUrl }}
        />
        <View style={styles.description}>
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
                                underlayColor='white'>
              {MapIcon}
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.separator}/>
        <Text style={styles.reviewTitle}>Reviews: </Text>
        <Reviews {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  details: {
    marginTop: 65,
  },
  photo: {
    flex: 1
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    marginBottom: -100
  },
  leftCol: {
    width: 150
  },
  rightCol: {
    top: 20,
    width: 180,
    flexDirection: 'row'
  },
  title: {
    color: colors.darkgreen,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10
  },
  location: {
    color: colors.darktan
  },
  reviewTitle: {
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
