'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import favoriteActions from '../../actions/favorite-actions';

import List from '../../components/list/List.component';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List navigator={this.props.navigator}
            isFetching={this.props.state.listingsReducer.isFetching}
            items={this.props.state.listingsReducer.homeData}
            favorites={this.props.state.listingsReducer.favorites}
            userLocation={this.props.state.appReducer.geolocation}
            userId={this.props.state.userReducer.userId}
            automaticallyAdjustContentInsets={false}
            fullScreen={true}
            actions={{ ...this.props.actions }}
      />
    );
  }
}

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