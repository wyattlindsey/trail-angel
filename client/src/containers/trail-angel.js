'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as testActions from '../actions/test-actions';
import Test from '../components/test.component';

// import any top level presentational components here

class TrailAngel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <Test
        foo={state.foo}
        bar={state.bar}
        { ...actions } />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    state: state.testReducer
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(testActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailAngel);