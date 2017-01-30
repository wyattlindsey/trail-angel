'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import favoriteActions from '../actions/favorite-actions';

import List from '../components/list/List.component';

const Home = (props) => {
  const { state, actions } = props;
  return (
    <List  navigator={props.navigator} isFetching={state.listingsReducer.isFetching}
           items={state.listingsReducer.homeData}
           favorites={state.listingsReducer.favorites}
           userLocation={state.appReducer.geolocation}
           userId={state.userReducer.userId}
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
    actions: bindActionCreators({ ...favoriteActions}, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);