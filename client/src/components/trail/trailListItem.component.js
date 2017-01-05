import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
  }

  componentDidMount() {
    // this.props.addFavorite(null, null);    // just trying to test the action
  }

  render() {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={{uri: this.props.image_url}} style={styles.photo} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.location}> {this.props.location.city} </Text>
            <Text style={styles.rating}> Rating: {this.props.rating} </Text>
            <Text style={styles.description} numberOfLines={0}>{this.props.snippet_text}</Text>
          </View>
              <View><Text style={styles.distance}> {this.props.distance} miles </Text></View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}

