import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, MapView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({

  textContainer: {
    flexDirection: 'row',
    padding: 20,
    flex: 1
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

});

export default class TraillistDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <View>
          <View style={styles.textContainer}>
           <Text style={styles.title}>{this.props.name}</Text>
            <Text style={styles.rating}> {this.props.rating} </Text>
            <Text style={styles.description} numberOfLines={0}>{this.props.snippet_text}</Text>}
          </View>
        </View>    
      );
    }
   
  
}




