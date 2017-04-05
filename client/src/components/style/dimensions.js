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

  // Note: this returns an object with the following shape:
  // {width: 375, scale: 2, height: 667}
  // We may want to change the name of this dimensions property.
  windowHeight: () => {
    return Dimensions.get('window');
  }
};

export default dimensions;
