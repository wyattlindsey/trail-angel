'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import * as _ from 'lodash';

import Reviews from './Reviews.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import Map from '../map/Map.component';
import colors from '../style/colors';


export default class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      dimensions: {
        width: null,
        height: null
      }
    };
  }

  componentDidMount() {
    if (this.props.formatted_address !== undefined) {
      this.setState({
        address: this.props.formatted_address.replace(/, /g, '\n')
      });
    }

    const isFavorite = this._checkIsFavorite(this.props.id, this.props.favorites);
    this.setState({
      isFavorite
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formatted_address !== undefined) {
      this.setState({
        address: this.props.formatted_address.replace(/, /g, '\n')
      });
    }

    const isFavorite = this._checkIsFavorite(this.props.id, nextProps.favorites);

    this.setState({
      isFavorite
    });
  }

  _toggleFavorite() {
    if (!this.state.isFavorite) {
      this.props.actions.addFavorite(this.props.id);
      this.setState({
        isFavorite: true
      });
    } else {
      this.props.actions.removeFavorite(this.props.id);
      this.setState({
        isFavorite: false
      });
    }
  }

  _handleGoToMap() {
    this.props.navigator.push({
      title: 'Dashboard',
      component: Map,
      passProps: {
        ...this.props
      }
    });
  }

  _checkIsFavorite(id, favorites) {
    return _.findIndex(favorites, { id }) !== -1;
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
    let orientation = this.state.dimensions.width < this.state.dimensions.height ?
      'portrait' : 'landscape';

    console.log(this.state.dimensions.height);

    const FavoriteIcon = this.state.isFavorite ?
      <Icon name='star' size={30} color={colors.warning} /> :
      <Icon name='star-o' size={30} color={colors.warning} />;

    const MapIcon = <Icon name='map'
                          size={25}
                          color={colors.mapColor}
                    />

    const detailsProps = {
      toggleFavorite: this._toggleFavorite.bind(this),
      goToMap: this._handleGoToMap.bind(this),
      FavoriteIcon,
      MapIcon,
      address: this.state.address,
      ...this.props
    }

    return (
      <Grid onLayout={this._onLayoutChange}>
        {orientation === 'portrait' ?
          <Grid>
            <Row>
              <Image
                source={{ uri: this.props.photoLargeUrl }}
                style={{
                  flex: 1
                }}
              />
            </Row>
            <Row>
              <DetailsDashboard {...detailsProps} />
            </Row>
            <View style={styles.separator}/>
            <Row>
              <Reviews {...this.props} />
            </Row>
          </Grid>
            :
          <Grid>
            <Row size={40}>
              <Image
                source={{ uri: this.props.photoLargeUrl }}
                style={{
                  flex: 1
                }}
              />
            </Row>
            <Row size={60}>
              <Col size={60}>
                <Reviews {...this.props} />
              </Col>
              <Col size={40}>
                <DetailsDashboard {...detailsProps} />
              </Col>
            </Row>
            <View style={styles.separator}/>
            <Row>
              <Reviews {...this.props} />
            </Row>
          </Grid>
        }
      </Grid>
    );
  }
}

const DetailsDashboard = (props) => (
  <Grid>
    <Col size={60}
         style={{
           padding: 20
         }}
    >
      <Text style={styles.title}>{props.name}</Text>
      <Text style={{ color: colors.darktan }}>{props.address}</Text>
    </Col>
    <Col  size={40}
          style={{
            padding: 10,
            alignItems: 'center'
          }}
    >
      <TouchableHighlight onPress={props.toggleFavorite}
                          underlayColor='white'
                          style={{
                            alignItems: 'center',
                            padding: 20
                          }}
      >
        {props.FavoriteIcon}
      </TouchableHighlight>
      <TouchableHighlight onPress={props.goToMap}
                          underlayColor='white'
                          style={{
                            alignItems: 'center',
                            padding: 20
                          }}>
        {props.MapIcon}
      </TouchableHighlight>
    </Col>
  </Grid>
);

const styles = StyleSheet.create({
  title: {
    color: colors.darkgreen,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10
  },
  reviewTitle: {
    color: colors.darkgray,
    fontSize: 16,
    fontWeight: '400',
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.beige
  }
});
