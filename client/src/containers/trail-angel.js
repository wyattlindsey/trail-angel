'use strict';

import React, { Component } from 'react';

// import any top level presentational components here

class TrailAngel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;

    return (
      <p>Hello, world!!</p>
    )
  }
}