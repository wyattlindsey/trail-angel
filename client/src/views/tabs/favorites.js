'use strict';

import React from 'react';
import { StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import favoriteActions from '../../actions/favorite-actions';
import List from '../../components/list/List.component';
import colors from '../../components/style/colors';

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

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
  },
  container: {
    marginTop: 65,
    marginBottom: 40
  },
  favoritesTitle: {
    color: colors.darkgray,
    fontSize: 16,
    fontWeight: '400',
    padding: 20,
  },
  centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
  horizontal: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, }
});