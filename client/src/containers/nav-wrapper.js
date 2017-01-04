'use strict';

import React, { Component } from 'react';
import { View, NavigatorIOS, StyleSheet, AsyncStorage } from 'react-native';
import Login from '../components/auth/login.component';
import App from './app';

const id_token = 'trailangel_id_token';

export default class Nav extends Component {

  componentDidMount() {
    //this.getToken();
  }

  // This is
  async getToken() {
    try {
          const token = await AsyncStorage.getItem(id_token);
          if (token !== null){
            console.log('----------GOT A PRE-EXISTING TOKEN------', token);
            lock.getProfile(token, (err, profile) => {
              if (err) {
                console.log('-----error getting profile------', err.message);
              }
              // redirect to home page here without going to login page
              // add token and profile props
              console.log('---------GOT A PROFILE----------', profile);


              this.props.navigator.push({
                title: 'From Login',
                component: App,
                passProps: {
                  profile: profile,
                  token: token,
                },
              });

            });
          }
        } catch (err) {
          console.log('--------------No token exists---------------')
        }
  }

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