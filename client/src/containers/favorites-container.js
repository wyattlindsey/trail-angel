'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as trailActions from '../actions/favorite-actions';

import FavoriteList from '../components/favorite/favoriteList.component';

const Favorites = (props) => {
  const { state, actions } = props;
  return (
    <FavoriteList isFetching={state.isFetching}
                  items={state.items}
                  {...actions} />
  );
};

const mapStateToProps = function(state) {
  return {
    state: state.favoritesReducer
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
)(Favorites);