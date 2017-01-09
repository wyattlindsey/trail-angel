'use strict';

import actionTypes from '../actions/action-types';
import * as _ from 'lodash';

const initialState = {
  isFetching: false,
  trails: []
}

export default function trailsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.REQUEST_TRAILS:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.RECEIVE_TRAILS:
      return {
        ...state,
        isFetching: false,
        trails: action.trails,
      };
    case actionTypes.UPDATE_TRAIL:
      const updatedTrail = _.find(state.trails, { id: action.trailId });
      if (updatedTrail === undefined) {
        return state;
      } else {
        updatedTrail[action.attribute] = action.newValue;
        let trails = state.trails.slice();
        trails.splice(_.indexOf(trails, { id: action.trailId }), 1, updatedTrail);
        return {
          ...state,
          trails
        }
      }
    default:
      return state;
  }
};