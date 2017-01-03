import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput, Text, Image } from 'react-native';
import Nav from '../common/footer.component';
import App from '../../containers/app';

import Auth0Lock from 'react-native-lock';
import { auth0Credentials } from '../../../config';

var lock = new Auth0Lock(auth0Credentials);

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
  }

  _onLogin() {
    lock.show({
      closable: true,
    }, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }

      // this.props.navigator.push({
      //   title: 'From Login',
      //   component: App
      // });
      console.log('token: ', token, 'profile: ', profile);
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

  // onPress() {
    // this.props.navigator.push({
    //     title: 'From Login',
    //     component: Nav
    // });
  // }

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
        <TouchableHighlight
          style={styles.signInButton}
          underlayColor='#949494'
          onPress={this._onLogin}>
          <Text>Log In</Text>
        </TouchableHighlight>
      </View>
    );
  }

      // <View style={styles.container}>
      //   <TextInput style={styles.textInput} placeholder="Username"/>
      //   <TextInput style={styles.textInput} placeholder="Password"/>

      //   <TouchableHighlight style={[styles.button, styles.green]} onPress={this.onPress}>
      //       <Text>Login</Text>
      //   </TouchableHighlight>
      // </View>

}