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
    width: 50
    // height: 100
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

export default class FavoriteListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPressFavorite(e) {
    debugger;
  }

  render() {
    let imagePath = this.props.isFavorite ? '../../../img/heart_filled.png' : '../../../img/heart.png';
    const addFavorite = () => { this.props.addFavorite(this.props.id) };
    const removeFavorite = () => { this.props.removeFavorite(this.props.id) };

    return (
      <View>
        <View style={styles.rowContainer}>
            <Image source={{uri: this.props.image_url}} style={styles.photo} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.location}> {this.props.location.city} </Text>
            <Text style={styles.rating}> Rating: {this.props.rating} </Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}