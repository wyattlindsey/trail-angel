import React from 'react';
import {  View,
          Text,
          StyleSheet,
          Image,
          TouchableHighlight,
          ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
 rowContainer: {
    flexDirection: 'row',
    padding: 20,
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

});

export default class ReviewListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const link = `https:${this.props.profile_photo_url}`;
    return (
      <View>
        <View style={styles.rowContainer}>
          <View>
            <Image source={{uri: link}} style={styles.photo} />
          </View> 
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.author_name}</Text>
            <Text style={styles.location}>Rating: {this.props.rating} </Text>
            <Text style={styles.description} numberOfLines={10}>{this.props.text}</Text>
          </View>
        </View>
      </View>  
    );
  }
}

