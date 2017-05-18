import * as types from '../constants/actionTypes';
import {getRestaurantsApi} from '../api/api';

export function updateFilter(value) {
  return {
    type: types.UPDATE_FILTER,
    value,
    pagerNum:1,
    initialLoad: false
  };
}

export function setActiveItem(id, scroll) {
  return {
    type: types.SET_ACTIVE_ITEM,
    id,
    scroll
  };
}
// TODO: Combine next two actions
// Should be called set pagernum
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

export function loadRestaurantsFail(isLoading, error) {
  return {
    type: types.LOAD_RESTAURANTS_FAIL,
    isLoading,
    error
  };
}

export function loadRestaurants(){
  return function(dispatch){
    dispatch(loadingRestaurants(true));
    return getRestaurantsApi().then((response) => {
      dispatch(loadRestaurantsSuccess(response, false));
    }).catch(error => {
      dispatch(loadRestaurantsFail(false, error));
    });
  };
}
