'use strict';

import React, { Component } from 'react';
import { View, NavigatorIOS, StyleSheet } from 'react-native';
import Login from '../components/auth/login.component';

export default class Nav extends Component {
  render() {
    let styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#111111'
      },
    });

    return (
      <NavigatorIOS ref="nav"
                    style={styles.container}
                    initialRoute={{
                      component: Login,
                      title: 'Welcome to TrailAngel'
                    }}
      />
    );
  }
};