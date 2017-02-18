'use strict';

import { Platform, StatusBar } from 'react-native';

const dimensions = {
  navHeight: (orientation = 'portrait') => {
    if (Platform.OS === 'ios') {
      return orientation === 'portrait' ?
        64 : 32
    } else if (Platform.OS === 'android') {
      return StatusBar.currentHeight;
    }
  },

  tabBarHeight: () => {
    return Platform.OS === 'ios'? 50 : 56;
  }
};

export default dimensions;