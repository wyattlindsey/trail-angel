'use strict';

import React from 'react';
import { Image, View, ListView, StyleSheet,
  Text, ActivityIndicator } from 'react-native';
import Row from './trailListItem.component';
import dataApi from '../../api/';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  homeImage: {
    backgroundColor: '#333333',
  },
  container: { 
    marginTop: 65
  }
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

    if (!this.state.trailsLoaded && nextProps.trails !== undefined && nextProps.trails.length > 0) {
      const homeListings = nextProps.trails;
      let found = false;
      while(!found) {
        const randomIndex = Math.floor(Math.random() * homeListings.length);
        let photos = false;
        if (homeListings[randomIndex] !== undefined) {
          photos = homeListings[randomIndex].photos;
        }
        if (photos && Array.isArray(photos)) {
          found = true;
          const randomPhotoIndex = Math.floor(Math.random() * photos.length);
          const photoReference = homeListings[randomIndex].photos[randomPhotoIndex].photo_reference;
          const randomPhotoUrl = dataApi.googlePlaces.getUrlForPhoto(photoReference, 400);
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
      <View style={styles.container}>
        {this.props.fetching ?
          <ActivityIndicator animating={this.props.isFetching}
                             style={{}}
                             color='darkgreen'
                             size='large' /> :
          <View>
            {this.state.randomPhotoUrl ?
              <View style={styles.homeImage}>
                <Image
                  source={require('../../../img/home.jpg')}
                />
              </View> : 
          <View />}
            <ListView automaticallyAdjustContentInsets={false}
              dataSource={this.state.dataSource}
              renderRow={(data) => <Row navigator={this.props.navigator}
                                        favorites={this.props.favorites}
                                        addFavorite={this.props.addFavorite}
                                        removeFavorite={this.props.removeFavorite}
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
