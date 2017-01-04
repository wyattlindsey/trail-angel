import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput, Text, Image, AsyncStorage } from 'react-native';
import Nav from '../common/footer.component';
import App from '../../containers/app';

import Auth0Lock from 'react-native-lock';
import { auth0Credentials } from '../../../config';

var lock = new Auth0Lock(auth0Credentials);
var lockAPI = lock.authenticationAPI();
const tokenKey = 'whatGoesHere';
const profileKey = 'thisIsAGreatProfile'

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

export default class LoginWithRedux extends Component {
  constructor(props) {
    super(props);
    this._onLogin = this._onLogin.bind(this);

    this.state = {
      hasToken: false
    }

  }

  componentDidMount() {

    this.getToken();
  }

  async getToken() {
    try {
      //const tok = await AsyncStorage.removeItem(tokenKey); //This is used to get rid of a token for debuggin
      const tok = await AsyncStorage.getItem(tokenKey);
      if (tok !== null){
        // this means we have a valid token. fetch profile info from auth0 here?
        console.log('We have a pre-existing valid token!!!!!!: ', tok);
        this.setState({'hasToken': true}, () => this.getProfile(tok));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProfile(token) {
    // lock.getProfile(token, (err, profile) => {
    //   if (err) {
    //     console.log('-----error getting profile------', err.message);
    //   }
    //   console.log('---------GOT A PROFILE----------', profile);
    //   this.reroute(profile, token)
    // });

    try {
      const prof = await AsyncStorage.getItem(profileKey);
      if (prof !== null){

        this.reroute(prof, token);
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
    });
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

  _onLogin() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setToken(token);
      this.setProfile(profile);

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

  render() {
    const { username, password } = this.props;

    return (
        <View style={styles.container}>
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={require('../../../img/badge.png')}
          />
          <Text style={styles.title}>TrailAngel</Text>
          <Text style={styles.subtitle}>Hike your heart out on your favorite trails.</Text>
        </View>

        {this.state.hasToken ?
            <Text>...Logging In...</Text> :

            <TouchableHighlight
              style={styles.signInButton}
              underlayColor='#949494'
              onPress={this._onLogin}>
              <Text>Log In</Text>
            </TouchableHighlight>
        }
      </View>
    );
  }

}