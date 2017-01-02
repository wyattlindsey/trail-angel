import React from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Row from './trailListItem.component';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});



export default class TrailList extends React.Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      trails: [],
      dataSource: ds.cloneWithRows(['hi']),
      // dataSource: ds.cloneWithRows(trailActions.fetchTrailsIfNeeded({
      //   location: 'San Francisco'
      // }))
    };
  }

  componentDidMount() {
    this.props.fetchTrailsIfNeeded({})
      .then((trails) => {
        this.setState({
          trails,
          dataSource: ds.cloneWithRows(trails)    // ds not defined here
        });
      });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}
