import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, NavigatorIOS } from 'react-native';
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
    padding: 10,
    marginTop: 100,
    marginLeft: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    paddingTop: 5,
    paddingLeft: 20,
  },
  nickname: {
    //color: '#3D728E',
    fontSize: 20,
    //fontWeight: '600',
    //textAlign: 'center',
    marginBottom: 45,
  },
  avatar: {
    height: 140,
    width: 140,
    borderRadius: 20
  },
  hikeDistance: {
    //fontSize: 18,
    //textAlign: 'center',

  },
  separator: {
    //backgroundColor: '#8E8E8E',
    //width: 300,
    height: 1,
    backgroundColor: '#E3E0D7',
    //borderTopWidth: 1,
    //borderBottomWidth: 1,
    //alignItems: 'center',
    marginLeft: 45

  },
  // location: {
  //   fontSize: 16,
  //   color: '#786048',
  //   height: 50
  // },
  menuItem: {
    flex: 1,
    height: 10,
    width: 100,
    flexDirection: 'row',
    //borderBottomWidth: 1,
    //borderStyle: 'solid',
    //borderBottomColor: '#E3E0D7',
    marginLeft: 50,
    //flex: 1,
    //alignItems: 'center'
    //backgroundColor: 'pink'

  },
  logoutText: {
    height: 20
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
          <TouchableHighlight
                style={styles.menuItem}
                underlayColor='#949494'
                onPress={this._logoutPress.bind(this)}>
                <View>
                <Text style={styles.logoutText}>Logout</Text>
                </View>
          </TouchableHighlight>
          <View style={styles.separator} />
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