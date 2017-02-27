'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  ActivityIndicator,
  Switch,
  Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';

import searchActions from '../../actions/search-actions';
import favoriteActions from '../../actions/favorite-actions';
import List from '../../components/list/List.component';

import colors from '../../components/style/colors';
import dimensions from '../../components/style/dimensions';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTimeout: false,
      localSearch: true,
      searchText: '',
      containerDimensions: {
        width: 1,
        height: 1
      },
      searchBarDimensions: {
        height: 1,
        width: 1
      }
    };

    this._debouncedHandleInput = _.debounce(this._handleInput, 300);
    this._clearInput = this._clearInput.bind(this);
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

  _onLayoutChange = (e) => {
    this.setState({
      containerDimensions: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height
      }
    });
  }

  _getSearchBarDimensions = (e) => {
    this.setState({
      searchBarDimensions: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height
      }
    });
  }

  render() {
    const orientation =
      this.state.containerDimensions.width < this.state.containerDimensions.height ?
        'portrait' : 'landscape';

    const marginTop = Platform.OS === 'ios' ?
                            dimensions.navHeight(orientation) + 16
                            : 0;

    return (
      <View onLayout={this._onLayoutChange}>
        <View style=
                {{
                  height: dimensions.windowHeight().height
                }}
        >
          <View style=
                  {{
                    flexDirection: 'column',
                    flex: 1
                  }}
          >
            <View style=
                    {{
                      padding: 8,
                      alignItems: 'flex-start',
                      backgroundColor: 'white',
                      marginTop,
                      flex: 1,
                      flexDirection: 'row'
                    }}
                  onLayout={this._getSearchBarDimensions}
            >
              <View style={{ flex: 5 }}>
                <TextInput
                  ref={(component) => this._textInput = component}
                  style={styles.input}
                  placeholder='Search...'
                  onChangeText={(text) => {this._debouncedHandleInput(text)}}
                  autoCapitalize='none'
                  autoCorrect={false}
                  autoFocus={true}
                  disableFullscreenUI={true}
                  underlineColorAndroid='transparent'
                />
              </View>
              <View style=
                    {{
                      flex: 1,
                      alignItems: 'center'
                    }}
              >
                <Switch style={styles.localSearch}
                        onValueChange={this._handleLocalSwitch.bind(this)}
                        value={this.state.localSearch}
                        onTintColor={colors.seafoam} />
                <Text style=
                        {{
                          paddingTop: 8,
                          fontSize: 11,
                          textAlign: 'center'
                        }}
                >
                  Local Search
                </Text>
              </View>
            </View>
            <View style=
                  {{
                    flex: orientation === 'portrait' ? 5 : 4
                  }}
            >
              {this.state.searchTimeout ?
                <View style=
                       {{
                         alignItems: 'center',
                         justifyContent: 'center',
                         marginTop: 32
                       }}
                >
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
                         automaticallyAdjustContentInsets={false}
                         fullScreen={false}
                         subtractDimensions={{
                           height: this.state.searchBarDimensions.height + 16,
                           width: 0
                         }}
                         actions={this.props.actions}

                  />
                </View>
              }
            </View>
          </View>
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
  input: {
    height: 30,
    marginRight: 20,
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 14,
    color: 'white',
    backgroundColor: colors.midgray,
    borderRadius: 2
  },

  localSearch: {
    marginRight: 5,
    alignItems: 'center'
  },

  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.midgray
  }
});