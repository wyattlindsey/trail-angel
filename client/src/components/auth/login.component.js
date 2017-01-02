import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput, Text } from 'react-native';
import Nav from '../common/footer.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    height: 40,
    fontSize: 20,
    textAlign: 'center'
  },
  welcome: {
    color: 'white'
  }
});

export default class LoginWithRedux extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    this.props.navigator.push({
        title: 'From Login',
        component: Nav
    });
  }

  render() {
    const { username, password } = this.props;

    return (
        <View style={styles.container}>
          <TextInput style={styles.textInput} placeholder="Username"/>
          <TextInput style={styles.textInput} placeholder="Password"/>
          <TouchableHighlight style={[styles.button, styles.green]} onPress={this.onPress}>
            <Text>Login</Text>
          </TouchableHighlight>
        </View>
    );
  }


}