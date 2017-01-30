'use strict';

import React, { Component } from 'react';
import { TabBarIOS, StyleSheet, View, Text } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import icons from './tabs/icons';
import colors from '../components/style/colors';
import Home from './tabs/home';
import Favorites from './tabs/favorites';
import Search from './tabs/search';
import More from './tabs/more';

import appActions from '../actions/app-actions';

class Index extends Component {
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
        unselectedTintColor={colors.tabBarUnselected}
        tintColor={colors.tabBarSelected}
        barTintColor={colors.tabBarColor}>
        <TabBarIOS.Item
          title ='Home'
          icon={{uri: icons.homeIcon, scale: 5}}
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          <Home navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon='search'
          selected={this.state.selectedTab === 'search'}
          onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
        <Search navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ='favorites'
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: 'favorites',
            });
          }}>
          <Favorites navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ='more'
          selected={this.state.selectedTab === 'more'}
          onPress={() => {
            this.setState({
              selectedTab: 'more',
            });
          }}>
          <More navigator={this.props.navigator}
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);

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
