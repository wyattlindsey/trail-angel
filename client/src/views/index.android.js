'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
;
import icons from './tabs/icons';
import colors from '../components/style/colors';
import Home from './tabs/home';
import Favorites from './tabs/favorites';
import Search from './tabs/search';
import More from './tabs/more';

import appActions from '../actions/app-actions';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let profile = {};
    if (typeof this.props.passProps.profile === 'string') {
      profile = JSON.parse(this.props.passProps.profile);
    } else {
      profile = this.props.passProps.profile;
    }

    this.props.actions.initializeApp({
      userId: profile.identities[0].userId,
      email: profile.email,
      avatarUrl: profile.picture,
      nickname: profile.nickname
    })
      .catch((err) => {
        console.error('error initializing application', err);
      });
  }

  render() {
    return (
      <View style={{ marginTop: 100 }}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...appActions}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);