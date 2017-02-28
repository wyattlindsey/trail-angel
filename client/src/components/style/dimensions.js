'use strict';

import { Platform, StatusBar, Dimensions } from 'react-native';

const dimensions = {
  navHeight: (orientation = 'portrait') => {
    if (Platform.OS === 'ios') {
      return orientation === 'portrait' ?
        64 : 32
    } else if (Platform.OS === 'android') {
      return 0;
    }
  },

  tabBarHeight: () => {
    return Platform.OS === 'ios'? 50 : 50 + StatusBar.currentHeight;
  },

  windowHeight: () => {
    return Dimensions.get('window');
  }
};

export default dimensions;