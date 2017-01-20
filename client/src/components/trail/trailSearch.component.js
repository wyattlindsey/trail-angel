'use strict';

import React from 'react';
import { View, Text, StyleSheet, TextInput,
          ListView, ActivityIndicator, Switch } from 'react-native';
import * as _ from 'lodash';

import Row from '../trail/trailListItem.component';

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    padding: 8,
    paddingBottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 65,
    height: 120
  },
  input: {
    height: 30,
    flex: 1,
    margin: 5,
    marginRight: 20,
    marginTop: 15,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
  },
  localSearch: {
    top: 14,
    marginRight: 5,
    alignItems: 'center'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
  gray: { backgroundColor: '#cccccc', },
  horizontal: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, },
  searchResults: {
    backgroundColor: '#FFFFFF',
    height: 600,
    marginTop: 30,
    marginBottom: 35
  }
});

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds,
      searchTimeout: false,
      localSearch: true,
      searchText: ''
    };

    this._debouncedHandleInput = _.debounce(this._handleInput, 300);
    this._clearInput = this._clearInput.bind(this);
  }

  _handleInput(text) {
    this.setState({
      searchText: text
    });
    let textInput = text.trim().replace(/ /g, '%20');
    this.setState({
      searchTimeout: false
    });
    if (text === '') {
      this.props.cancelRequest();
    } else {
      const location = this.state.localSearch ? {
                                                 latitude: this.props.userLocation.coords.latitude,
                                                 longitude: this.props.userLocation.coords.longitude
                                               }
                                                 : null
      this.props.search(textInput, location)
        .then((data) => {
          if (data === undefined ||
              data.searchResults === undefined ||
              data.searchResults.length === 0)
          {
            this.setState({
              searchTimeout: true
            });
          }
        });
    }
  }

  _clearInput() {
    this._textInput.setNativeProps({text: ''});
    this.setState({
      searchText: ''
    });
  }

  _handleLocalSwitch(value) {
    this.setState({ localSearch: value });
    this._clearInput();
    this.props.cancelRequest();
  }

  componentDidMount() {
    if (this.props.searchResults !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.props.searchResults)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.searchResults)
      });
    }
  }

  render() {
    return(
      <View>
        <View style={styles.searchBar}>
          <TextInput
            ref={(component) => this._textInput = component}
            style={styles.input}
            placeholder='Search...'
            onChangeText={(text) => {this._debouncedHandleInput(text)}}
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
          />
          <Switch style={styles.localSearch}
                  onValueChange={this._handleLocalSwitch.bind(this)}
                  value={this.state.localSearch}>
            <Text style={{  top: 40,
                            fontSize: 12,
                            textAlign: 'center'
                        }}>Local Search</Text>
          </Switch>
        </View>
        <View style={styles.searchResults}>
          {this.state.searchTimeout ?
            <View style={{ justifyContent: 'center',
                           padding: 40 }}>
              <Text style={{ fontSize: 18 }}>
                No results found
              </Text>
            </View>
             :
            <View>
              {this.props.isFetching ?
                <ActivityIndicator animating={this.props.isFetching}
                                   style={[styles.centering, styles.horizontal,
                                     { height: 100}]}
                                   color='darkgreen'
                                   size='large' />
                :
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(data) => <Row favorites={this.props.favorites}
                                            addFavorite={this.props.addFavorite}
                                            removeFavorite={this.props.removeFavorite}
                                            userLocation={this.props.userLocation}
                                            navigator={this.props.navigator}
                                            {...data} />}
                  enableEmptySections={true}
                  style={styles.searchResults}
                  renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                               style={styles.separator} />}
                />
              }


            </View>
          }
        </View>
      </View>
    );
  }
}


