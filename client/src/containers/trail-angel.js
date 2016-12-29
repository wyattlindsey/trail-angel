'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

// import any top level presentational components here

class TrailAngel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return (
      <View>
        <Text>
          Hello, World!!!
        </Text>
      </View>
    )
  }
}

export default connect((state) => ({
  state: state
}),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(TrailAngel);