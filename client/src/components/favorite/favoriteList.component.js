import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Row from '../favorite/favoriteListItem.component';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  container: {
    marginTop: 65,
    marginBottom: 40
  },
  centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
  gray: { backgroundColor: '#cccccc', },
  horizontal: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, }
});



export default class FavoriteList extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.ds.cloneWithRows(this.props.favorites)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.favorites)
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={this.props.isFetching}
                           style={[styles.centering, styles.horizontal, { height: this.props.isFetching ? 260 : 0 }]}
                           color='darkgreen'
                           size='large' />
        <ListView
          enableEmptySections={true}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={(data) => <Row favorites={this.props.favorites}
                                    addFavorite={this.props.addFavorite}
                                    removeFavorite={this.props.removeFavorite}
                                    userLocation={this.props.userLocation}
                                    navigator={this.props.navigator}
                                    {...data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>

    );
  }
}