import * as types from '../actions/actionTypes';

export default function pinsReducer(state = [], action){
  switch(action.type){
    case types.CLICK_PIN:
      // Spread the array, create copy with new action
      return [...state,
        Object.assign({}, action.course)
      ];
    default:
      return state;
  }
}
