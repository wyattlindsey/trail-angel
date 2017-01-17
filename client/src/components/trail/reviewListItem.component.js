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
    flex: 1,
    flexDirection: 'column'
  }
});

export default class ReviewListItem extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  componentDidMount() {
     this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    console.log('ReviewListItem', this.props);
    return (
      <View style={styles.rowContainer}>
       <Text>I'm in the ReviewListItem component! </Text>
        <Image source={{uri: this.props.reviews[0].profile_photo_url}} style={styles.photo} />
        <Text>{this.props.reviews[0].author_name}</Text>
        <Text style={styles.location}> {this.props.reviews[0].rating} </Text>
        <Text style={styles.review} numberOfLines={10}>{this.props.reviews[0].text}</Text>
      </View>
    );
  }
}

