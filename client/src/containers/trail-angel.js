'use strict';

import React, { Component } from 'react';
import { TabBarIOS, StyleSheet, View, Text } from 'react-native';

import icons from '../components/icons';
import Trails from './trails-container';

export default class TabBarExample extends Component {
  static title = '<TabBarIOS>';
  static description = 'Trail Angel Navigation';
  static displayName = 'TrailAngel';

  state = {
    selectedTab: 'redTab',
  };

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
          <Trails />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === 'blackTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blackTab',
            });
          }}>
          {this._renderContent('#333333', 'Search')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="favorites"
          selected={this.state.selectedTab === 'greyTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greyTab',
            });
          }}>
          {this._renderContent('#333333', 'Favorites')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon ="more"
          selected={this.state.selectedTab === 'beigeTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'beigeTab',
            });
          }}>
          {this._renderContent('#d7c797', 'Settings/More')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

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
