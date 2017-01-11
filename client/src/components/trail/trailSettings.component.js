import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, NavigatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect  } from 'react-redux';
import * as userActions from '../../actions/user-actions';
import Login from '../auth/login.component';

const styles = StyleSheet.create({
  rowContainer: {
    padding: 20,
    marginTop: 100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: '#3D728E',
    fontSize: 18,
    fontWeight: '600',
    height: 50
  },
  photo: {
    height: 120,
    width: 120,
    marginRight: 20,
    borderRadius: 20
  },
  location: {
    fontSize: 18,
    color: '#786048',
    height: 50
  },
  rating: {
    fontSize: 18,
    color: '#909060',
    height: 50
  },
  menuItem: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    //flex: 1,
    //alignItems: 'center'

  },
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
    return (
    <View>


      <View style={styles.rowContainer}>
        <Image source={{uri: profile.avatarUrl}} style={styles.photo} />
        <Text style={styles.title}>{profile.nickname}</Text>
        <Text style={styles.location}> San Francisco </Text>
        <Text style={styles.rating}> Favorites: 10 </Text>
        <Text> Logout </Text>
      </View>
      <TouchableHighlight
              style={styles.menuItem}
              underlayColor='#949494'
              onPress={this._logoutPress.bind(this)}>
              <View>
              <Text style={styles.title}>Logout</Text>
              </View>
      </TouchableHighlight>
      </View>
    );
  }
}

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