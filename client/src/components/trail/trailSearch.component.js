import React from 'react';
import { View, Text, StyleSheet, TextInput,
          ListView, ActivityIndicator } from 'react-native';
import * as _ from 'lodash';

import Row from '../favorite/favoriteListItem.component';

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
    marginTop: 20
  }
});

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds
    };
  }

  handleInput(text) {
    if (text === '') {
      this.props.cancelSearch();
    } else {
      this.props.search({
        location: text
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.results)
      });
    }
  }

  render() {
    return(
      <View>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Search...'
            onChangeText={(text) => {this.handleInput(text)}}
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus={true}
          />
        </View>
        <View style={styles.searchResults}>
          <ActivityIndicator animating={this.props.isFetching}
                             style={[styles.centering, styles.horizontal, { height: this.props.isFetching ? 260 : 0 }]}
                             color='darkgreen'
                             size='large' />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data}/>}
            enableEmptySections={true}
            style={styles.searchResults}
            renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                         style={styles.separator} />}
          />
        </View>
      </View>
    );
  }
}


