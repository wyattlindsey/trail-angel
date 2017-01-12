import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import dataApi from '../../api';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 15
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 50
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
  separator: {
    backgroundColor: '#E3E0D7'
  },
  distance: {
    // width: 100,
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'flex-end',
  },
  removeButton: {
    height: 20,
    width: 20,
    marginRight: 20,
    marginTop: 80
  },
});

export default class FavoriteListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: null
    };
  }

  componentDidMount() {

    dataApi.google.getDistance2Points(this.props.userLocation.coords,
      this.props.location.coordinate)
      .then((distance) => {
        if (distance) {
          this.setState({
            distance: distance.text
          });
        }
      });
  }

  _handleRemoveFavorite() {
    this.props.removeFavorite(this.props.id);
  }

  render() {
    let view;
    if (this.props.location === undefined) {
      view = <View />
    } else {
      view = <View>
        <View style={styles.rowContainer}>
          <View>
            <Image source={{uri: this.props.image_url}} style={styles.photo} />
            <TouchableHighlight onPress={this._handleRemoveFavorite.bind(this)}
                                style={styles.removeButton}>
              <Icon name='minus-circle' size={20} color='darkgreen' />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.location}> {this.props.location.city} </Text>
            <Text style={styles.rating}> Rating: {this.props.rating} </Text>
            <Text style={styles.description} numberOfLines={0}>{this.props.snippet_text}</Text>
          </View>
          <View>
            <Text style={styles.distance}>
              {this.state.distance ? this.state.distance : ''}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    }
    return (
      <View>
        {view}
      </View>
    );

  }
}