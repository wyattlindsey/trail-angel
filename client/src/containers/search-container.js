'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as searchActions from '../actions/search-actions';

import TrailSearch from '../components/trail/trailSearch.component';

const Search = (props) => {
  const { state, actions } = props;
  return (
    <TrailSearch  isFetching={state.searchReducer.isFetching}
                  results={state.searchReducer.results}
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
    actions: bindActionCreators(searchActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);