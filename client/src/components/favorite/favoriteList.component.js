import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Row from '../favorite/favoriteListItem.component';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});



export default class FavoriteList extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds.cloneWithRows([
        { trailName: 'Stanford Dish Trails',
          distance: 'Distance',
          location: 'Location',
          description: 'Description',
          ratings: '*****',
        },
        { trailName: 'Shoreline Trails',
          distance: 'Distance',
          location: 'Location',
          description: 'Description',
          ratings: '*****',
        }
      ]),
    };
  }

  componentDidMount() {
    this.props.fetchFavorites('5eeb9d7c-3f5e-4a93-9379-c2c03c2055e6')    // todo import the userid from store
      .then((data) => {
        this.setState({
          dataSource: this.ds.cloneWithRows(data.items)
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.ds.cloneWithRows(nextProps.items)
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}