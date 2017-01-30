'use strict';

import React from 'react';
import { View, Text, StyleSheet, TextInput,
  ListView, ActivityIndicator, Switch } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import searchActions from '../../actions/search-actions';
import favoriteActions from '../../actions/favorite-actions';
import List from '../../components/list/List.component';

import colors from '../../components/style/colors';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
      this.props.actions.cancelRequest();
    } else {
      const location = this.state.localSearch ? {
        latitude: this.props.state.appReducer.geolocation.coords.latitude,
        longitude: this.props.state.appReducer.geolocation.coords.longitude
      }
        : null
      this.props.actions.search(textInput, location)
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
    this.props.actions.cancelRequest();
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
    return (
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
                  value={this.state.localSearch}
                  onTintColor={colors.seafoam}>
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

              <List  navigator={this.props.navigator}
                     isFetching={this.props.state.listingsReducer.isFetching}
                     items={this.props.state.listingsReducer.searchResults}
                     favorites={this.props.state.listingsReducer.favorites}
                     userLocation={this.props.state.appReducer.geolocation}
                     userId={this.props.state.userReducer.userId}
                     actions={this.props.actions}
              />


            </View>
          }
        </View>
      </View>
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
    actions: bindActionCreators({ ...searchActions, ...favoriteActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    padding: 8,
    paddingBottom: 45,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: 'white',
    backgroundColor: colors.midgray,
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
    backgroundColor: colors.midgray,
  },
  centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
  gray: { backgroundColor: colors.darkgray, },
  horizontal: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, },
  searchResults: {
    backgroundColor: 'white',
    height: 600,
    marginTop: 30,
    marginBottom: 130
  }
});