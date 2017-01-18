import React from 'react';
import { View, Text, StyleSheet, TextInput,
          ListView, ActivityIndicator } from 'react-native';
import * as _ from 'lodash';

import Row from '../trail/trailListItem.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 65
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
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
    marginTop: 20,
    marginBottom: 35
  }
});

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds,
      searchTimeout: false
    };

    this._debouncedHandleInput = _.debounce(this._handleInput, 300);
  }

  _handleInput(text) {
    console.log(text);
    let textInput = text.trim().replace(/ /g, '%20');
    this.setState({
      searchTimeout: false
    });

    if (text === '') {
      this.props.cancelRequest();
    } else {
      this.props.getListings({
        name: textInput,
        collection: 'search',
        latitude: this.props.userLocation.coords.latitude,
        longitude: this.props.userLocation.coords.longitude
      })
      .then((success) => {
        if (!success) this.props.cancelRequest();
        this.setState({
          searchTimeout: !success
        });
      });
    }
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
    const search = { search: true };
    return(
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Search...'
            onChangeText={(text) => {this._debouncedHandleInput(text)}}
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
          />
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
              {this.props.fetching ?
                <ActivityIndicator animating={this.props.isFetching}
                                   style={[styles.centering, styles.horizontal,
                                     { height: 260}]}
                                   color='darkgreen'
                                   size='large' />
                :
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={(data) => <Row addToCollection={this.props.addToCollection}
                                            removeFromCollection={this.props.removeFromCollection}
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


