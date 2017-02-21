'use strict';

import React from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import Item from './Item.component';
import colors from '../style/colors';
import dimensions from '../style/dimensions';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds,
      dimensions: {
        width: 1,
        height: 1
      }
    };
  }

  componentDidMount() {
    if (this.props.items !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(this.props.items)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.items)
      });
    }
  }

  _onLayoutChange = (e) => {
    this.setState({
      dimensions: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height
      }
    });
  }

  render() {
    const orientation = this.state.dimensions.width < this.state.dimensions.height ?
      'portrait' : 'landscape';
    
    return (
      <View onLayout={this._onLayoutChange}>
        <View style={{ height: dimensions.windowHeight().height }}>
          {this.props.fetching ?
            <ActivityIndicator animating={this.props.isFetching}
                               color={colors.seafoam}
                               size='large'
            />
              :
            <ListView dataSource={this.state.dataSource}
                      automaticallyAdjustContentInsets=
                        {this.props.automaticallyAdjustContentInsets || true}
                      renderRow={(data) => <Item  navigator={this.props.navigator}
                                                  actions={this.props.actions}
                                                  favorites={this.props.favorites}
                                                  userLocation={this.props.userLocation}
                                                  userId={this.props.userId}
                                                  {...data} />}
                      enableEmptySections={true}
                      renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                                   style=
                                                                     {styles.separator}
                                                             />
                                      }
            />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.midgray
  }
});