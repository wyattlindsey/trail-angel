import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  rowContainer: {
    padding: 20,
    marginTop: 100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#3D728E',
    fontSize: 18,
    fontWeight: '600',
    height: 50
  },
  photo: {
    height: 50,
    width: 50,
    marginRight: 20,
    borderRadius: 20
  },
  location: {
    fontSize: 18,
    color: '#786048',
    height: 50
  },
  rating: {
    fontSize: 18,
    color: '#909060',
    height: 50
  }
});

export default class TrailSettings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.rowContainer}>
        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} style={styles.photo} />
        <Text style={styles.title}> John Doe </Text>
        <Text style={styles.location}> San Francisco </Text>
        <Text style={styles.rating}> Favorites: 10 </Text>
        <Text> Logout </Text>
      </View>
    );
  }
}

