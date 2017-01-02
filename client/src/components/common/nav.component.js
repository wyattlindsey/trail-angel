//NavigationBar
import React, { Component } from 'react';
import { Text, NavigatorIOS, TouchableHighlight, StyleSheet } from 'react-native';
import Login from '../auth/login.component';

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  },
});

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  onRightButtonPress() {
    this.refs.nav.push({
      title: "From Right",
      component: SignUp
    })
  }

  render() {
    return (
      <NavigatorIOS ref="nav"
       style={styles.container}
        initialRoute={{ 
          component: Login,
          title: 'Welcome to TrailAngel',
          rightButtonTitle: "Sign Up",
          onRightButtonPress: this.onRightButtonPress   
       }}
      />
    )
  }
}
