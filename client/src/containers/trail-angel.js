'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';

import TabBar from '../components/common/footer.component';
import TrailList from '../components/trail/trailList.component';

class TrailAngel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    return (
      <TabBar trails={state.trails}
              actions={actions} />
    );
  }
}

const mapStateToProps = function(state) {
  return {
    state: state
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailAngel);

// <Test
// foo={state.foo}s
// bar={state.bar}
// custom={state.custom}
// { ...actions } />