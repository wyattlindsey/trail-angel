import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { foo, bar, testAction } = this.props;
    return (
      <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
        <TouchableOpacity title='test'
                style={styles.button}
                onPress={testAction}>
          <Text>Press me</Text>
        </TouchableOpacity>
        <Text>{foo}</Text>
        <Text>{bar}</Text>
      </View>
    );
  }
}