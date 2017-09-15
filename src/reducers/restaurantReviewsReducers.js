import {
  UPDATE_SEARCH_TERM,
  LOAD_RESTAURANTS_SUCCESS,
  INCREASE_PAGER_NUM,
  DECREASE_PAGER_NUM,
  LOADING_RESTAURANTS,
  LOAD_RESTAURANTS_FAIL,
  SET_ACTIVE_ITEM,
  SEARCHING_RESTAURANTS_BY_NAME,
  SEARCHING_RESTAURANTS_BY_NAME_SUCCESS,
  SEARCHING_RESTAURANTS_BY_NAME_FAIL,
  SEARCHING_RESTAURANTS_BY_CITY,
  SEARCHING_RESTAURANTS_BY_CITY_FAIL,
  SEARCHING_RESTAURANTS_BY_CITY_SUCCESS,
  SEARCHING_RESTAURANTS_BY_ZIP,
  SEARCHING_RESTAURANTS_BY_ZIP_FAIL,
  SEARCHING_RESTAURANTS_BY_ZIP_SUCCESS,
  SEARCHING_RESTAURANTS,
  SEARCHING_RESTAURANTS_FAIL,
  SEARCHING_RESTAURANTS_SUCCESS,
  SET_RATING_FILTER,
  SET_SEARCH_TYPE
 } from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';
import Filters from '../utils/Filters';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export default function restarurantReviewsReducer (state = initialState.restaurantReviews , action) {
  // let newState

  // https://github.com/gaearon/redux-thunk
  switch (action.type) {
    case UPDATE_SEARCH_TERM: {
      return objectAssign({}, state, {filter: action.value}, {pagerNum: 1}, {initialLoad: action.initialLoad});
    }
    case SET_SEARCH_TYPE: {
      return objectAssign({}, state, {searchType: action.value});
    }
    case SET_RATING_FILTER: {
      return objectAssign({}, state, {ratingFilter: action.ratingFilter}, {pagerNum: 1});
    }
    case SET_ACTIVE_ITEM:
      return objectAssign({}, state, {activeItem: action.id}, {scroll: action.scroll});
    case INCREASE_PAGER_NUM:
      return objectAssign({}, state, {pagerNum: action.value});
    case DECREASE_PAGER_NUM:
      return objectAssign({}, state, {pagerNum: action.value});
    case LOAD_RESTAURANTS_SUCCESS: {
      const filteredRestaurants = Filters.shuffle(action.restaurants);
      return objectAssign({}, state, {restaurants: filteredRestaurants}, {loading: action.isLoading},{count:action.count});
    }
    case LOAD_RESTAURANTS_FAIL:
      return objectAssign({}, state, {loading: action.isLoading}, {loadingError: action.error});
    case LOADING_RESTAURANTS:
      return objectAssign({}, state, {loading: action.isLoading});
      case SEARCHING_RESTAURANTS_BY_NAME_SUCCESS: {
        const filteredRestaurants = Filters.alphaSort(action.restaurants);
        return objectAssign({}, state, {restaurants: filteredRestaurants}, {searchIsLoading: action.searchIsLoading}, {pagerNum: 1}, {loadingError: false});
      }
      case SEARCHING_RESTAURANTS_BY_NAME_FAIL:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading}, {loadingError: (action.error)? true: false});
      case SEARCHING_RESTAURANTS_BY_NAME:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading});
      case SEARCHING_RESTAURANTS_BY_CITY_SUCCESS: {
        const filteredRestaurants = Filters.alphaSort(action.restaurants);
        return objectAssign({}, state, {restaurants: filteredRestaurants}, {searchIsLoading: action.searchIsLoading}, {pagerNum: 1},{loadingError: false});
      }
      case SEARCHING_RESTAURANTS_BY_CITY_FAIL:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading}, {loadingError: (action.error)? true: false});
      case SEARCHING_RESTAURANTS_BY_CITY:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading});
      case SEARCHING_RESTAURANTS_BY_ZIP_SUCCESS: {
        const filteredRestaurants = Filters.alphaSort(action.restaurants);
        return objectAssign({}, state, {restaurants:filteredRestaurants}, {searchIsLoading: action.searchIsLoading}, {loadingError: false}, {count:action.count}, {pagerNum: action.pagerNum});
      }
      case SEARCHING_RESTAURANTS_BY_ZIP_FAIL:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading}, {loadingError: (action.error)? true: false});
      case SEARCHING_RESTAURANTS_BY_ZIP:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading});
      case SEARCHING_RESTAURANTS_SUCCESS: {
        const filteredRestaurants = Filters.alphaSort(action.restaurants);
        return objectAssign({}, state, {restaurants:filteredRestaurants}, {searchIsLoading: action.searchIsLoading}, {loadingError: false}, {count:action.count}, {pagerNum: action.pagerNum});
      }
      case SEARCHING_RESTAURANTS_FAIL:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading}, {loadingError: (action.error)? true: false});
      case SEARCHING_RESTAURANTS:
        return objectAssign({}, state, {searchIsLoading: action.searchIsLoading});
    default:
      return state;
  }
}
