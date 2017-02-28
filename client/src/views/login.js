import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TextInput,
  Text,
  Image,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import { routes } from '../router';
import Index from './index';
import colors from '../components/style/colors';

import Auth0Lock from 'react-native-lock';
import config from '../../config';

const lock = new Auth0Lock({ clientId: config.AUTH0_CLIENT_ID, domain: config.AUTH0_DOMAIN });
const tokenKey = config.ASYNC_STORAGE_TOKEN_KEY;
const profileKey = config.ASYNC_STORAGE_PROFILE_KEY;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: false
    }

  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {

    try {
      const token = await AsyncStorage.getItem(tokenKey);

      if (token !== null){
        this.getProfile(token);
      }
    } catch (err) {
      console.error('Error retrieving token from AsyncStorage: ', err);
    }
  }

  async getProfile(token) {

    try {
      const profile = await AsyncStorage.getItem(profileKey);
      if (profile !== null){
        this.reroute(profile, token);
      }
    } catch (err) {
      console.error('Error retrieving profile from AsyncStorage: ', err);
    }

  }

  reroute(profile, token) {
    this.props.navigator.push({
      title: 'TrailAngel',
      component: Index,
      index: routes.index,
      passProps: {
        profile,
        token
      },
      // hack to remove back button leading to login page
      leftButtonTitle: ' '
    });
  }

  async setToken(token) {
    try {
      await AsyncStorage.setItem(tokenKey, JSON.stringify(token));
    } catch (err) {
      console.error('Error setting token to AsyncStorage: ', err);
    }
  }

  async setProfile(profile) {
    try {
      await AsyncStorage.setItem(profileKey, JSON.stringify(profile));
    } catch (err) {
      console.error('Error setting profile to AsyncStorage: ', err);
    }
  }

  async removeToken() {
    try {
      await AsyncStorage.removeItem(tokenKey);
    } catch (err) {
      console.error('Error removing token from AsyncStorage: ', err);
    }
  }

  async removeProfile() {
    try {
      await AsyncStorage.removeItem(profileKey);
    } catch (err) {
      console.error('Error removing profile from AsyncStorage: ', err);
    }
  }

  addOrFindUser(profile) {

    const userId = profile.identities[0].userId;
    const userEndpoint = config.TRAIL_ANGEL_API_URL + '/api/users';
    return fetch(userEndpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userId
      })
    })
      .catch(err => {
        console.error('Add or find user request error: ', err);
      });
  }

  onLogin() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.error('Error logging in via Auth0 Lock: ', err);
        return;
      }
      this.setToken(token);
      this.setProfile(profile);
      this.addOrFindUser(profile);
      this.reroute(profile, token);
    });
  }

  render() {
    return (
      this.props.state.userReducer.hasToken ?

        <Text>...Logging In...</Text> :

        <View style={styles.container}>
          <View style={styles.messageBox}>
            <Image
              style={styles.badge}
              source={require('../../img/backpack.png')}
            />
            <Text style={styles.title}>TrailAngel</Text>
            <Text style={styles.subtitle}>
              Hike your heart out on your favorite trails.
            </Text>
          </View>
          <TouchableHighlight
            style={styles.signInButton}
            underlayColor={colors.lightgray}
            onPress={this.onLogin.bind(this)}>
            <Text>Log In</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.beige,
  },

  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },

  badge: {
    alignSelf: 'center',
    height: 200,
    width: 200,
  },

  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 4,
  },

  welcome: {
    color: 'white'
  },

  signInButton: {
    height: 50,
    alignSelf: 'stretch',
    backgroundColor: colors.midgray,
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});