'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';

import { routes } from '../../router';
import googleApi from '../../api/google-api';
import userActions from '../../actions/user-actions';

import Login from '../../views/login';
import colors from '..//style/colors';
import dimensions from '..//style/dimensions';

class SupplyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: {
        width: 1,
        height: 1
      }
    }
  }

  componentWillMount() {
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
      <View style=
              {{
                marginTop: dimensions.navHeight(orientation),
                alignItems: 'center'
              }}
            onLayout={this._onLayoutChange}
      >
        <Text>This is a list.</Text>
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
    actions: bindActionCreators(userActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplyList);


const styles = StyleSheet.create({
  avatar: {
    height: 130,
    width: 130,
    borderRadius: 20,
    margin: 10
  },

  nickname: {
    color: colors.seafoam,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 30
  },

  separator: {
    backgroundColor: colors.beige,
    height: StyleSheet.hairlineWidth,
  },

  menuContainer: {
    flexDirection: 'column',
    width: 300,
    margin: 10,
    marginTop: 0
  },

  menuItemContainer: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5
  },

  logoutText: {
    fontSize: 14,
    paddingLeft: 8
  },

  chevron: {
    paddingTop: 4,
    marginLeft: 8,
    color: colors.lightgray
  }
});
