'use strict';

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  NavigatorIOS,
  ScrollView
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
import trailAngelApi from '../../api/trailangel-api';

let id = 0;

class SupplyList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.state.userReducer.userId,
      dimensions: {
        width: 1,
        height: 1
      },
      inputText: '',
      supplies: [
        {name: 'Flashlight', isChecked: false, key: id++},
        {name: 'Emergency Blanket', isChecked: true, key: id++},
        {name: 'Canteen', isChecked: false, key: id++},
      ]
    }

  }

  componentDidMount() {
    return trailAngelApi.getSupplyItems(this.state.userId)
    .then((supplylist) => {
      console.log(supplylist);
      this.setState({
        supplies: supplylist
      });
    })
    .catch((err) => {
      console.log('error getting supply list', err);
    })
  }

  _onLayoutChange = (e) => {
    this.setState({
      dimensions: {
        width: e.nativeEvent.layout.width,
        height: e.nativeEvent.layout.height
      }
    });
  }

  _handleItemPress = (index, e) => {
    console.log(index);
    let updatedSupplies = this.state.supplies.slice();
    console.log(updatedSupplies[index]);
    updatedSupplies[index].isChecked = !updatedSupplies[index].isChecked;
    this.setState({
      supplies: updatedSupplies
    })
  }

  _handleItemDelete = (index, e) => {
    trailAngelApi.removeSupplyItem(this.state.userId, this.state.supplies[index].name);
    let updatedSupplies = this.state.supplies.slice();
    updatedSupplies.splice(index, 1);
    this.setState({
      supplies: updatedSupplies
    })
  }

  _handleSubmit = (e) => {
    console.log('Item to be added: ', e.nativeEvent.text);
    console.log('userId: ', this.state.userId);
    trailAngelApi.addSupplyItem(this.state.userId, e.nativeEvent.text);
    let updatedSupplies = this.state.supplies.slice();
    updatedSupplies.push({name: e.nativeEvent.text, isChecked: false, key: id++});
    this.setState({
      supplies: updatedSupplies
    })
  }

  render() {
    const orientation = this.state.dimensions.width < this.state.dimensions.height ?
      'portrait' : 'landscape';

    return (
      <View style=
              {{
                marginTop: dimensions.navHeight(orientation),
                width: dimensions.windowWidth(),
                height: dimensions.windowHeight(),
                //backgroundColor: colors.beige,
                flexDirection: 'column',
                alignItems: 'center'
              }}
            onLayout={this._onLayoutChange}
      >
        <TextInput style=
                        {{
                          marginTop: 20,
                          paddingLeft: 10,
                          height: 40,
                          width: 200,
                          alignSelf: 'center',
                          borderColor: colors.midgray,
                          borderWidth: 0.5,
                          borderRadius: 5
                        }}
                    placeholder='Input supply list item'
                    onChangeText={(text) => this.setState({inputText: text})}
                    onSubmitEditing={this._handleSubmit.bind(this)}
                    returnKeyType='done'
                    maxLength={17}
        />
        <View style=
                {{
                  marginTop: 20,
                  width: dimensions.windowWidth() - 14,
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  flexDirection:'column',
                  borderColor: colors.beige,
                  borderStyle: 'solid',
                  borderWidth: 2,
                  borderRadius: 5
                }}
        >

          {this.state.supplies.map((item, index) => {
              return (
                <SupplyListItem
                  index={index}
                  name={item.name}
                  isChecked={item.isChecked}
                  key={item.key}
                  onPress={this._handleItemPress.bind(this)}
                  onDelete={this._handleItemDelete.bind(this)} />
              )
            })
          }

        </View>
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

const SupplyListItem = (props) => {
  const CheckBoxIcon = props.isChecked ?  <Icon name='check-square'
                                                size={24}
                                                color='#000000'
                                                style={{padding:10}}
                                          />
                                            :
                                          <Icon name='square'
                                                size={24}
                                                color='#000000'
                                                style={{padding:10}}
                                          />;

  return (
    <View style=
            {{
              margin: 10,
              flexWrap: 'wrap',
              justifyContent: 'flex-start',
              flexDirection:'row',
            }}
    >
      <TouchableWithoutFeedback onPress={props.onPress.bind(this, props.index)}>
        {CheckBoxIcon}
      </TouchableWithoutFeedback>
      <Text style={{padding: 10, fontSize: 20}}>
              {props.name}
      </Text>
      <TouchableHighlight onPress={props.onDelete.bind(this, props.index)}>
        <Icon name='times' size={24} color='#000000' style={{padding:10 }} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({

  separator: {
    backgroundColor: colors.midgray,
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
