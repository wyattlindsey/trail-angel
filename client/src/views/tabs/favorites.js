'use strict';

import React from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import favoriteActions from '../../actions/favorite-actions';
import List from '../../components/list/List.component';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List items={this.props.state.listingsReducer.favorites}
            navigator={this.props.navigator}
            isFetching={this.props.state.listingsReducer.isFetching}
            favorites={this.props.state.listingsReducer.favorites}
            userLocation={this.props.state.appReducer.geolocation}
            userId={this.props.state.userReducer.userId}
            actions={this.props.actions}
      />
    );
  }
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