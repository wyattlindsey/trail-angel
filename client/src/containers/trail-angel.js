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
  static title = '<TabBarIOS>';
  static description = 'Trail Angel Navigation';
  static displayName = 'TrailAngel';
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'redTab'
    };
  }

  componentDidMount() {
    let profile = {};
    // it seems like sometimes the profile is still a string, especially when using pre-existing
    // token
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

  _renderContent = (color: 'string', pageText: 'string' ) => {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>Renders {pageText} Page</Text>
      </View>
    );
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        barTintColor="darkgreen">
        <TabBarIOS.Item
          title ="Home"
          icon={{uri: icons.homeIcon, scale: 5}}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            });
          }}>
          <Trails navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'blackTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blackTab',
            });
          }}>
        <Search navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="favorites"
          selected={this.state.selectedTab === 'greyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greyTab',
            });
          }}>
          <Favorites navigator={this.props.navigator}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="more"
          selected={this.state.selectedTab === 'beigeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'beigeTab',
            });
          }}>
          <Settings navigator={this.props.navigator} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...appActions}, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(TrailAngel);


