'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  NavigatorIOS,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import userActions from '../../actions/user-actions';
import Login from '../auth/login.component';
import googleApi from '../../api/google-api';

var { height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  profileContainer: {
    marginTop: 75,
    marginLeft: 15,
    flex: .4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'column',
    paddingTop: 5,
    paddingLeft: 20,
  },
  nickname: {
    color: '#3D728E',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 45,
  },
  avatar: {
    flexDirection: 'column',
    height: 145,
    width: 145,
    borderRadius: 20,
  },
  separator: {
    backgroundColor: '#E3E0D7',
    height: 1,
    marginLeft: 38
  },
  menuContainer: {
    flex: .6
  },
  menuItemContainer: {
    flexDirection: 'row',
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  logoutText: {
    fontSize: 16,
    paddingLeft: 8
  },
  listUl: {
    paddingTop: 1
  },
  chevronRight1: {
    paddingTop: 4,
    color: '#9E9E9E',
    marginLeft: 241
  },
  chevronRight2: {
    paddingTop: 4,
    color: '#9E9E9E',
    marginLeft: 261
  },
  chevronRight3: {
    paddingTop: 4,
    color: '#9E9E9E',
    marginLeft: 261
  },
  logos: {
    marginBottom: 70,
    alignItems: 'center'
  }
});

class TrailSettings extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      city: 'Unavailable'
    }
  }

  componentWillMount() {
    googleApi.getCity(this.props.state.appReducer.geolocation.coords)
    .then((city) => {
      this.setState({
        city: city
      });
    })
    .catch((err) => {
      console.log('Error retrieving location: ', err);
    });
  }

  _logoutPress() {
    console.log('Pressed the logout menu option');
    this.props.actions.logoutUser()
    .then(() => {
      this.props.navigator.push({
      title: 'Welcome to TrailAngel',
      component: Login,
      // hack to remove back button leading to login page
      leftButtonTitle: ' ',
      });
    })
  }

  render() {
    let profile = {
      avatarUrl: this.props.state.userReducer.avatarUrl,
      nickname: this.props.state.userReducer.nickname,
    }
    return (
        <View style={styles.outerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: profile.avatarUrl}}
            style={styles.avatar}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.nickname}>{profile.nickname}</Text>
            <Text style={styles.hikeDistance}> Hiked: 350 km </Text>
            <Text> Location: {this.state.city}</Text>
            <Text> Favorites: {this.props.favoritesCount} </Text>

          </View>

        </View>
        <View style={styles.separator} />
          <View style={styles.menuContainer}>
          <TouchableHighlight
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View style={styles.menuItemContainer}>
                  <Icon style={styles.listUl} name='list-ul' size={17} color={'#9E9E9E'} />
                  <Text style={styles.logoutText}>Supply List</Text>
                  <Icon style={styles.chevronRight1} name='chevron-right' size={12} />
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
          <TouchableHighlight
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View style={styles.menuItemContainer}>
                <Icon  name='cog' size={20} color={'#9E9E9E'} />
                  <Text style={styles.logoutText}>Settings</Text>
                  <Icon style={styles.chevronRight2} name='chevron-right' size={12} />
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
          <TouchableHighlight
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View style={styles.menuItemContainer}>
                  <Icon  name='sign-out' size={20} color={'#9E9E9E'} />
                  <Text style={styles.logoutText}>Log Out</Text>
                  <Icon style={styles.chevronRight3} name='chevron-right' size={12} />
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
          </View>
          <View style={styles.logos}>
            <Image source={require('../../../img/powered-by-google-on-white.png')} />
            <Image source={require('../../../img/powered-by-darksky.png')}
                   style={{ marginTop: 5, opacity: 0.5 }}/>
          </View>
        </View>

    );
  }
}





//View style={styles.separator} />
// style={styles.title}
  // style={styles.title}

   // style={styles.menuItem}

      // View style={styles.rowContainer}>
      //   Image source={{uri: profile.avatarUrl}} style={styles.photo} />
      //   Text style={styles.title}>{profile.nickname}</Text>
      //   Text style={styles.location}> San Francisco </Text>
      //   Text style={styles.rating}> Favorites: 10 </Text>

      // TouchableHighlight
      //         style={styles.menuItem}
      //         underlayColor='#949494'
      //         onPress={this._logoutPress.bind(this)}>
      //         <View>
      //         <Text style={styles.title}>Logout</Text>
      //         </View>
      // /TouchableHighlight>


const mapStateToProps = function(state) {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrailSettings);