'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import listingActions from '../actions/listing-actions';
import searchActions from '../actions/search-actions';
import favoriteActions from '../actions/favorite-actions';

import TrailSearch from '../components/trail/trailSearch.component';

const Search = (props) => {
  const { state, actions } = props;
  return (
    <TrailSearch  isFetching={state.listingsReducer.isFetching}
                  searchResults={state.listingsReducer.searchResults}
                  favorites={state.listingsReducer.favorites}
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
    actions: bindActionCreators({ ...listingActions, ...searchActions, ...favoriteActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);