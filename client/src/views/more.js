'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import userActions from '../actions/user-actions';

const User = (props) => {
  const { state, actions } = props;
  return (
    <LoginView userId={state.userId}
               email={state.email}
               avatarUrl={state.usersReducer.avatarUrl}
               {...actions} />
  );
};

const mapStateToProps = function(state) {
  return {
    state: state.usersReducer
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
)(User);