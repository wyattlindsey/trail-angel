'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchActions from '../actions/search-actions';
import * as favoriteActions from '../actions/favorite-actions';

import TrailSearch from '../components/trail/trailSearch.component';

const Search = (props) => {
  const { state, actions } = props;
  return (
    <TrailSearch  isFetching={state.searchReducer.isFetching}
                  results={state.searchReducer.results}
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
    actions: bindActionCreators({ ...searchActions, ...favoriteActions }, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);