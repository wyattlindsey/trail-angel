import React from 'react';
import { View, ListView, StyleSheet,
          Text, ActivityIndicator } from 'react-native';
import Row from './trailListItem.component';
import dataApi from '../../api/';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  centering: { alignItems: 'center', justifyContent: 'center', padding: 8, },
  gray: { backgroundColor: '#cccccc', },
  horizontal: { flexDirection: 'row', justifyContent: 'space-around', padding: 8, },

  homeImage: { marginTop: 80 },
  scrollContainer: { top: 200 },
});



export default class TrailList extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: this.ds,
      initialPosition: null,
      randomListing: null,
      randomPhotoUrl: null,
      trailsLoaded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trails !== undefined) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.trails)
      });
    }

    if (!this.state.trailsLoaded && this.props.trails !== undefined && this.props.trails.length > 0) {
      const homeListings = this.props.trails;
      let found = false;
      debugger
      while(!found) {
        let randomIndex = Math.floor(Math.random() * homeListings.length);
        let photos = false;
        if (homeListings[randomIndex] !== undefined) {
          photos = homeListings[randomIndex].photos;
        }
        if (photos && Array.isArray(photos)) {
          debugger;
          found = true;
          let randomPhotoIndex = Math.floor(Math.random() * photos.length);
          const randomPhotoUrl = homeListings[randomIndex].photos[randomPhotoIndex];

          this.setState({
            trailsLoaded: true,
            randomListing: homeListings[randomIndex],
            randomPhotoUrl
          });
        }
      }
    }
  }

  render() {
    return (
      <View>
        {this.props.fetching ?
          <ActivityIndicator animating={this.props.isFetching}
                             style={[styles.centering, styles.horizontal,
                               { height: 260 }]}
                             color='darkgreen'
                             size='large' /> :
          <View>
            <Text style={styles.homeImage}>
              Hello world!
            </Text>
            <ListView
              style={styles.scrollContainer}
              dataSource={this.state.dataSource}
              renderRow={(data) => <Row navigator={this.props.navigator}
                                        addToCollection={this.props.addToCollection}
                                        removeFromCollection={this.props.removeFromCollection}
                                        userLocation={this.props.userLocation}
                                        {...data} />}
              enableEmptySections={true}
              renderSeparator={(sectionId, rowId) => <View key={rowId}
                                                           style={styles.separator} />}
            />
          </View>
        }
      </View>
    );
  }
}