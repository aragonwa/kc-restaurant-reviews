import * as types from '../constants/actionTypes';
import {getRestaurantsApi} from '../api/api';

export function updateFilter(value) {
  return {
    type: types.UPDATE_FILTER,
    value,
    pagerNum:1
  };
}

export function increasePagerNum(value) {
  return {
    type: types.INCREASE_PAGER_NUM,
    value
  };
}

export function decreasePagerNum(value) {
  return {
    type: types.DECREASE_PAGER_NUM,
    value
  };
}

export function loadingRestaurants(isLoading) {
  return {
    type: types.LOADING_RESTAURANTS,
    isLoading
  };
}

export function loadRestaurantsSuccess(restaurants, isLoading) {
  return {
    type: types.LOAD_RESTAURANTS_SUCCESS,
    restaurants,
    isLoading
  };
}

export function loadRestaurants(){
  return function(dispatch){
    dispatch(loadingRestaurants(true));
    return getRestaurantsApi().then(function(response) {
      dispatch(loadRestaurantsSuccess(JSON.parse(response), false));
    }, function(error) {
      // TODO: Replace with error
      console.error("Failed!", error);
    });
  };
}


//https://github.com/gaearon/redux-thunk

// export function getAllRestaurants() {
//   return function (dispatch) {
//     return fetchSecretSauce().then(
//       sauce => dispatch(makeASandwich(forPerson, sauce)),
//       error => dispatch(apologize('The Sandwich Shop', forPerson, error))
//     );
//   };
// }

// function getRestaurants() {
//   return fetch('//kcit-bzzqfx1:40001/api/business/count/a/47.0845/-122.5284/47.7803/-121.0657');
// }
