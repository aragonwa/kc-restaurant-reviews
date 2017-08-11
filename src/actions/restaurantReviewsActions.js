import * as types from '../constants/actionTypes';
import {getRestaurantsApi, getRestaurantsByNameApi, getRestaurantsByCityApi, getRestaurantsByZipApi} from '../api/api';

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

export function searchingRestaurantsByName(searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_NAME,
    searchIsLoading
  };
}

export function searchingRestaurantsByNameSuccess(restaurants, searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_NAME_SUCCESS,
    restaurants,
    searchIsLoading
  };
}

export function searchingRestaurantsByNameFail(searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_NAME_FAIL,
    searchIsLoading,
    error
  };
}
export function searchingRestaurantsByCity(searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_CITY,
    searchIsLoading
  };
}

export function searchingRestaurantsByCitySuccess(restaurants, searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_CITY_SUCCESS,
    restaurants,
    searchIsLoading
  };
}

export function searchingRestaurantsByCityFail(searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_CITY_FAIL,
    searchIsLoading,
    error
  };
}
export function searchingRestaurantsByZip(searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_ZIP,
    searchIsLoading
  };
}

export function searchingRestaurantsByZipSuccess(restaurants, searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_ZIP_SUCCESS,
    restaurants,
    searchIsLoading
  };
}

export function searchingRestaurantsByZipFail(searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_ZIP_FAIL,
    searchIsLoading,
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

export function searchRestaurants(name){
  return function(dispatch){
    dispatch(searchingRestaurantsByName(true));
    return getRestaurantsByNameApi(name).then((response) => {
      dispatch(searchingRestaurantsByNameSuccess(response, false));
    }).catch(error => {
      dispatch(searchingRestaurantsByNameFail(false, error));
    });
  };
}
export function searchCity(city){
  return function(dispatch){
    dispatch(searchingRestaurantsByCity(true));
    return getRestaurantsByCityApi(city).then((response) => {
      dispatch(searchingRestaurantsByCitySuccess(response, false));
    }).catch(error => {
      dispatch(searchingRestaurantsByCityFail(false, error));
    });
  };
}
export function searchZip(zip){
  return function(dispatch){
    dispatch(searchingRestaurantsByZip(true));
    return getRestaurantsByZipApi(zip).then((response) => {
      dispatch(searchingRestaurantsByZipSuccess(response, false));
    }).catch(error => {
      dispatch(searchingRestaurantsByZipFail(false, error));
    });
  };
}
