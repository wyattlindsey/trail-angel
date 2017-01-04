'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as trailActions from '../actions/trail-actions';

import TrailList from '../components/trail/trailList.component';

const Trails = (props) => {
  const { state, actions } = props;
  return (
    <TrailList isFetching={state.trailsReducer.isFetching}
               didInvalidate={state.trailsReducer.didInvalidate}
               lastUpdated={state.trailsReducer.lastUpdated}
               trails={state.trailsReducer.items}
               favorites={state.favoritesReducer.items}
               {...actions} />
  );
};

const mapStateToProps = function(state) {
  return {
    state: state
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
)(Trails);