'use strict';

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import colors from '../colors';

const ReviewListItem = (props) => (
  <View>
    <View style={styles.rowContainer}>
      <View>
        <Image source={{uri: `https:${props.profile_photo_url}`}}
               style={styles.photo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.author_name}</Text>
        <Text style={styles.location}>Rating: {props.rating} </Text>
        <Text style={styles.description} numberOfLines={10}>{props.text}</Text>
      </View>
    </View>
  </View>
)

export default ReviewListItem;

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
    fontWeight: '600',
    fontSize: 16,
    color: colors.seafoam
  },
  photo: {
    marginRight: 20,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  location: {
    color: colors.darktan
  },
  rating: {
    color: colors.peagreen
  },
  description: {
    lineHeight: 20,
    fontSize: 14,
    color: colors.darktan,
    textAlign: 'left',
    marginTop: 8,
  },
  separator: {
    backgroundColor: colors.beige,
    height: 1
  }

});