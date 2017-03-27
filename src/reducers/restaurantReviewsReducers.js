import { UPDATE_FILTER, LOAD_RESTAURANTS_SUCCESS, INCREASE_PAGER_NUM, DECREASE_PAGER_NUM, LOADING_RESTAURANTS, LOAD_RESTAURANTS_FAIL, SET_ACTIVE_ITEM } from '../constants/actionTypes';
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
    case UPDATE_FILTER: {
      return objectAssign({}, state, {filter: action.value}, {pagerNum: 1}, {initialLoad: action.initialLoad});
    }
    case SET_ACTIVE_ITEM:
      return objectAssign({}, state, {activeItem: action.id}, {scroll: action.scroll});
    case INCREASE_PAGER_NUM:
      return objectAssign({}, state, {pagerNum: action.value});
    case DECREASE_PAGER_NUM:
      return objectAssign({}, state, {pagerNum: action.value});
    case LOAD_RESTAURANTS_SUCCESS: {
      const filteredRestaurants = Filters.shuffle(action.restaurants);
      return objectAssign({}, state, {restaurants: filteredRestaurants}, {loading: action.isLoading});
    }
    case LOAD_RESTAURANTS_FAIL:
      return objectAssign({}, state, {loading: action.isLoading}, {loadingError: action.error});
    case LOADING_RESTAURANTS:
      return objectAssign({}, state, {loading: action.isLoading});
    default:
      return state;
  }
}
