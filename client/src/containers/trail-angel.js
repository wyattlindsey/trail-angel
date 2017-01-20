'use strict';

import React, { Component } from 'react';
import { TabBarIOS, StyleSheet, View, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import icons from '../components/icons';
import Trails from './trails-container';
import Favorites from './favorites-container';
import Search from '../containers/search-container';
import Settings from '../components/trail/trailSettings.component';
import appActions from '../actions/app-actions';

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

class TrailAngel extends Component {
  static title = 'TrailAngel';
  static description = 'Trail Angel Navigation';
  static displayName = 'TrailAngel';
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'home'
    };
  }

  componentDidMount() {
    let profile = {};
    if (typeof this.props.profile === 'string') {
      profile = JSON.parse(this.props.profile);
    } else {
      profile = this.props.profile;
    }

    this.props.actions.initializeApp({
      userId: profile.identities[0].userId,
      email: profile.email,
      avatarUrl: profile.picture,
      nickname: profile.nickname
    })
      .catch((err) => {
        console.error('error initializing application', err);
      });
  }

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="#cccccc"
        tintColor="white"
        barTintColor="#414141">
        <TabBarIOS.Item
          title ="Home"
          icon={{uri: icons.homeIcon, scale: 5}}
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          <Trails navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
        <Search navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="favorites"
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'favorites',
            });
          }}>
          <Favorites navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="more"
          selected={this.state.selectedTab === 'more'}
          onPress={() => {
            this.setState({
              selectedTab: 'more',
            });
          }}>
          <Settings navigator={this.props.navigator}
                    favoritesCount={this.props.state.listingsReducer.favorites.length} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...appActions}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailAngel);


