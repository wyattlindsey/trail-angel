//This is for testing purposes only please go ahead and edit this file as needed.

'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userActions from '../actions/user-actions';

import Nav from '../common/footer.component';

// import any top level presentational components here

class TrailAngel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
     <Login username={state.username} password={state.password} {...actions} />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    state: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailAngel);