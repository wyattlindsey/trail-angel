import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput, Text, Image, AsyncStorage } from 'react-native';
import Nav from '../common/footer.component';
import App from '../../containers/app';
import Login from './login.component';

import * as userActions from '../../actions/user-actions';

import Auth0Lock from 'react-native-lock';
import { auth0Credentials, paths } from '../../../config';

var lock = new Auth0Lock(auth0Credentials);
var lockAPI = lock.authenticationAPI();
const tokenKey = 'whatGoesHere';
const profileKey = 'thisIsAGreatProfile'

export default class LoginWithRedux extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    //this.removeToken = this.removeToken.bind(this);
    //this.removeProfile = this.removeProfile.bind(this);

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
        console.log('We have a pre-existing valid token!!!!!!: ', token);
        this.setState({'hasToken': true}, () => this.getProfile(token));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProfile(token) {
    try {
      const profile = await AsyncStorage.getItem(profileKey);
      if (profile !== null){

        this.reroute(profile, token);
      }
    } catch (err) {
      console.log(err);
    }

  }

  reroute(profile, token) {
    this.props.navigator.push({
      title: 'TrailAngel',
      component: App,
      passProps: {
        profile: profile,
        token: token
      },
      // hack to remove back button leading to login page
      leftButtonTitle: ' ',
      rightButtonTitle: 'Logout',
      onRightButtonPress: this.onRightButtonPress.bind(this)
    });
  }

  rerouteToLogin() {
    // this.props.navigator.push({
    //   title: 'TrailAngel',
    //   component: Login
    // });
    this.props.navigator.pop();

  }

  async setToken(token) {
    try {
        await AsyncStorage.setItem(tokenKey, JSON.stringify(token));
        console.log('A TOKEN WAS SET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      } catch (err) {
        console.log(err);
      }
  }

  async setProfile(profile) {
    try {
        await AsyncStorage.setItem(profileKey, JSON.stringify(profile));
        console.log('A PROFILE WAS SET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      } catch (err) {
        console.log(err);
      }
  }

  async removeToken() {
    try {
        await AsyncStorage.removeItem(tokenKey);
        this.setState({hasToken: false});
        console.log('A TOKEN WAS REMOVED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      } catch (err) {
        console.log('Error removing token from AsyncStorage: ', err);
      }
  }

  async removeProfile() {
    try {
        await AsyncStorage.removeItem(profileKey);
        console.log('A PROFILE WAS REMOVED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      } catch (err) {
        console.log('Error removing profile from AsyncStorage: ', err);
      }
  }

  addOrFindUser(profile) {
    var userId = profile.identities[0].userId;
    // Should use redux action here?  not sure how to do this yet
    const userEndpoint = paths.trailAngel.baseUrl + '/api/users';
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
    .then(response => {
      if (response.ok) {
        console.log('Add or find user request: ', response.status);
      }
    })
    .catch(err => {
      console.log('Add or find user request error: ', err);
    });
  }

  onLogin() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setToken(token);
      this.setProfile(profile);
      this.addOrFindUser(profile);
      //userActions.loginUser({email: profile.email, userId: profile.identities[0].userId, avatarUrl: profile.picture});
      this.reroute(profile, token);

    });
  }

  onRightButtonPress() {
    this.removeToken();
    this.removeProfile();
    this.rerouteToLogin();
  }

  render() {
    const { username, password } = this.props;

    return (
      this.state.hasToken ?

        <Text>...Logging In...</Text> :

        <View style={styles.container}>
          <View style={styles.messageBox}>
            <Image
              style={styles.badge}
              source={require('../../../img/badge.png')}
            />
            <Text style={styles.title}>TrailAngel</Text>
            <Text style={styles.subtitle}>Hike your heart out on your favorite trails.</Text>
          </View>
            <TouchableHighlight
              style={styles.signInButton}
              underlayColor='#949494'
              onPress={this.onLogin}>
              <Text>Log In</Text>
            </TouchableHighlight>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 169,
    width: 151,
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
    backgroundColor: '#D9DADF',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});