'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import listingActions from '../actions/listing-actions';
import * as favoriteActions from '../actions/favorite-actions';

import TrailSearch from '../components/trail/trailSearch.component';

const Search = (props) => {
  const { state, actions } = props;
  return (
    <TrailSearch  isFetching={state.listingsReducer.isFetching}
                  searchResults={state.listingsReducer.searchResults}
                  userLocation={state.appReducer.geolocation}
                  navigator={props.navigator}
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
    actions: bindActionCreators({ ...listingActions, ...favoriteActions }, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);