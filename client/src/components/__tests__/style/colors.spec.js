'use strict';

import 'react-native';
import React from 'react';

import colors from '../../style/colors';

describe('colors module', () => {
  it('exports the correct colors', () => {
    expect(colors).toMatchSnapshot();
  });
});