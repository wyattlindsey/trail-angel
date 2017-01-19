'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import favoriteActions from '../actions/favorite-actions';
import FavoriteList from '../components/favorite/favoriteList.component';

const Favorites = (props) => {
  const { state, actions } = props;
  // todo: tree-shake for unnecessary state
  return (
    <FavoriteList isFetching={state.listingsReducer.isFetching}
                  listings={state.listingsReducer.cache}
                  favorites={state.listingsReducer.favorites}
                  userId={state.userReducer.userId}
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
    actions: bindActionCreators(favoriteActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);