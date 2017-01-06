import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
 rowContainer: {
    flexDirection: 'row',
    padding: 20,
    flex: 1
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    width: 50,
    height: 100
  },
  title: {
    color: '#3D728E',
    fontSize: 16,
    fontWeight: '600'
  },
  leftColumn: {
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
    height: 1,
    backgroundColor: '#E3E0D7'
  },
  distance: {
    // width: 100,
    flex: 1,
    flexDirection: 'column'
    // justifyContent: 'flex-end',
  }
});

export default class TraillistItem extends React.Component {
  constructor(props) {
    super(props);

    // this should be coming from the store, not here
    this.state = {
      isFavorite: false
    }
  }

  _handlePress(e) {
    if (!this.state.isFavorite) {
      this.props.addFavorite(this.props.id);
    } else {
      this.props.removeFavorite.bind(this.props.id);
    }
    this.setState({
      isFavorite: !this.state.isFavorite
    });

  }

  render() {
    let imagePath = this.state.isFavorite ? '../../../img/heart_filled.png' : '../../../img/heart.png';

    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.leftColumn}>
            <Image source={{uri: this.props.image_url}} style={styles.photo} />
            <TouchableHighlight onPress={this._handlePress.bind(this)}>
              <Image
                style={styles.favorite}
                source={this.state.isFavorite ? require('../../../img/heart_filled.png') : require('../../../img/heart.png')} />
            </TouchableHighlight>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.location}> {this.props.location.city} </Text>
            <Text style={styles.rating}> Rating: {this.props.rating} </Text>
            <Text style={styles.description} numberOfLines={0}>{this.props.snippet_text}</Text>
          </View>
              <View><Text style={styles.distance}> {Number(this.props.distance / 1000).toFixed(1)} miles </Text></View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}

