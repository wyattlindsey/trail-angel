//NavigationBar
import React, { Component } from 'react';
import { Text, Navigator, TouchableHighlight } from 'react-native';

export default class Navigation extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'My Initial Scene', index: 0 }}
        renderScene={(route, navigator) => {
          return <MyScene title={route.title} />
        }}
      />
    );
  }
}