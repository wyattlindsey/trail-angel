'use strict';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as trailActions from '../actions/trail-actions';

// import TabBar from '../components/common/footer.component';
import Nav from '../components/common/nav.component';
import TrailList from '../components/trail/trailList.component';

const TrailAngel = (props) => {
  const { state, actions } = props;
  /**
   * temporarily rendering TrailList directly in order to work on trail list view
   */
  return (
    <TrailList isFetching={state.isFetching}
               didInvalidate={state.didInvalidate}
               lastUpdated={state.lastUpdated}
               items={state.items}
               {...actions} />
  );
};

const mapStateToProps = function(state) {
  return {
    state: state.trailsReducer
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(trailActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailAngel);