import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  },

  red: {
    backgroundColor: 'red'
  },

  green: {
    backgroundColor: 'lightgreen'
  }
});

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { foo, bar, custom, testIncrement, testDecrement, testIncrementAsync } = this.props;
    return (
      <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>

        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={testIncrement.bind(null, 'moar')}>
          <Text>more</Text>
        </TouchableOpacity>

        <TouchableOpacity
                style={[styles.button, styles.red]}
                onPress={testDecrement.bind(null, 'lessss')}>
          <Text>less</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.green]}
          onPress={testIncrementAsync}>
          <Text>more async</Text>
        </TouchableOpacity>


        <Text>{foo}</Text>
        <Text>{bar}</Text>
        <Text>{custom}</Text>

      </View>
    );
  }
}