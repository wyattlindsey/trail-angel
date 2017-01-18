'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import listingActions from '../actions/listing-actions';

import TrailList from '../components/trail/trailList.component';

const Trails = (props) => {
  const { state, actions } = props;
  return (
    <TrailList navigator={props.navigator} isFetching={state.listingsReducer.isFetching}
               trails={state.listingsReducer.collections.home}
               userLocation={state.appReducer.geolocation}
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
    actions: bindActionCreators({ ...listingActions}, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trails);