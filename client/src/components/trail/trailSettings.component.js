import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, NavigatorIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import * as userActions from '../../actions/user-actions';
import Login from '../auth/login.component';

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  profileContainer: {
    //padding: 10,
    marginTop: 75,
    marginLeft: 15,
    flex: .4,
    flexDirection: 'row',
    alignItems: 'center',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  rightContainer: {
    //flexGrow: 1,
    flexDirection: 'column',
    //width: 150,
    paddingTop: 5,
    paddingLeft: 20,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  nickname: {
    //color: '#3D728E',
    fontSize: 20,
    //fontWeight: '600',
    //textAlign: 'center',
    marginBottom: 45,
  },
  avatar: {
    //flex: 1,
    flexDirection: 'column',
    //justifyContent: 'flex-start',
    height: 145,
    width: 145,
    borderRadius: 20,
  },
  separator: {
    backgroundColor: '#E3E0D7',
    //width: 300,
    height: 1,
    //backgroundColor: '#9E9E9E',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    //alignItems: 'center',
    marginLeft: 25
  },
  menuContainer: {
    flex: .6
  },
  menuItem: {
    // paddingTop: 5,
    // paddingBottom: 5,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'black',

  },
  logoutContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  logoutText: {
    fontSize: 16,
    paddingLeft: 5
  },
  cog: {

  },
  chevronRight1: {
    paddingTop: 4,
    color: '#9E9E9E',
    marginLeft: 261
  },
  chevronRight2: {
    paddingTop: 4,
    color: '#9E9E9E',
    marginLeft: 261
  },
  chevronRight3: {
    paddingTop: 4,
    color: '#9E9E9E',
    marginLeft: 282
  }


});

class TrailSettings extends React.Component {
  constructor(props) {
    super(props);

  }

  _logoutPress() {
    console.log("Pressed the logout menu option");
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
    console.log(profile.nickname, profile.avatarUrl);
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
            <Text> Location: San Francisco </Text>
            <Text> Favorites: 10 </Text>

          </View>

        </View>
        <View style={styles.separator} />
          <View style={styles.menuContainer}>
          <TouchableHighlight
                style={styles.menuItem}
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View style={styles.logoutContainer}>
                  <Text style={styles.logoutText}>Supply List</Text>
                  <Icon style={styles.chevronRight1} name='chevron-right' size={12} color={'#9E9E9E'} />
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
          <TouchableHighlight
                style={styles.menuItem}
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View style={styles.logoutContainer}>
                <Icon  name='cog' size={20} color={'#9E9E9E'} />
                  <Text style={styles.logoutText}>Settings</Text>
                  <Icon style={styles.chevronRight2} name='chevron-right' size={12} color={'#9E9E9E'} />
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
          <TouchableHighlight
                style={styles.menuItem}
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View style={styles.logoutContainer}>
                  <Text style={styles.logoutText}>Log Out</Text>
                  <Icon style={styles.chevronRight3} name='chevron-right' size={12} color={'#9E9E9E'} />
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
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