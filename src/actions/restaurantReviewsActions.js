import * as types from '../constants/actionTypes';
import { getRestaurantsApi } from '../api/api';

// Updates search term of search input
export function updateSearchTerm (value) {
  return {
    type: types.UPDATE_SEARCH_TERM,
    value,
    initialLoad: false
  };
}

// Sets search type of dropdown menu
export function setSearchType (value) {
  return {
    type: types.SET_SEARCH_TYPE,
    value
  };
}

// Sets active item on restaurant list
export function setActiveItem (id, scroll) {
  return {
    type: types.SET_ACTIVE_ITEM,
    id,
  scroll};
}

// Increase Pager number
export function increasePagerNum (value) {
  return function (dispatch, getState) {
    dispatch({
      type: types.INCREASE_PAGER_NUM,
    value});
    dispatch(search(getState().restaurantReviews.searchType, getState().restaurantReviews.ratingFilter, false));
  };
}
// Decrease Pager number
export function decreasePagerNum (value) {
  return function (dispatch, getState) {
    dispatch({
      type: types.DECREASE_PAGER_NUM,
    value});
    dispatch(search(getState().restaurantReviews.searchType, getState().restaurantReviews.ratingFilter, false));
  };
}

export function search (searchType, ratingFilter, resetPager) {
  return function (dispatch, getState) {
    dispatch(searchingRestaurants(true));

    const pagerNum = (resetPager)? 1: getState().restaurantReviews.pagerNum;
    const pagerNumMod = (pagerNum <= 0) ? 0 : pagerNum - 1;

    return getRestaurantsApi(searchType, ratingFilter, pagerNumMod, '').then((response) => {
      dispatch(searchingRestaurantsSuccess(response, false,  getState().restaurantReviews.pagerNum));
    }).catch(error => {
      dispatch(searchingRestaurantsFail(false, error));
    });
  };
}

export function searchingRestaurants (searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS,
  searchIsLoading};
}

export function searchingRestaurantsSuccess (restaurants, searchIsLoading, pagerNum) {

  const count = restaurants.pop().NumberofItems;
   return {
    type: types.SEARCHING_RESTAURANTS_SUCCESS,
    restaurants,
    searchIsLoading,
    pagerNum,
    count
  };
}

export function searchingRestaurantsFail (searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_FAIL,
    searchIsLoading,
  error};
}
export function setRatingFilter (filters) {
  return function (dispatch, getState) {
    dispatch({
      type: types.SET_RATING_FILTER,
      ratingFilter: filters
    });
   dispatch(searchZip(getState().restaurantReviews.filter, getState().restaurantReviews.ratingFilter, true));
  };
}

export function loadingRestaurants (isLoading) {
  return {
    type: types.LOADING_RESTAURANTS,
  isLoading};
}

export function loadRestaurantsSuccess (restaurants, isLoading) {
  const count = restaurants.pop().NumberofItems;

  return {
    type: types.LOAD_RESTAURANTS_SUCCESS,
    restaurants,
    isLoading,
    count
  };
}

export function loadRestaurantsFail (isLoading, error) {
  return {
    type: types.LOAD_RESTAURANTS_FAIL,
    isLoading,
  error};
}

export function searchingRestaurantsByName (searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_NAME,
  searchIsLoading};
}

export function searchingRestaurantsByNameSuccess (restaurants, searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_NAME_SUCCESS,
    restaurants,
  searchIsLoading};
}

export function searchingRestaurantsByNameFail (searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_NAME_FAIL,
    searchIsLoading,
  error};
}
export function searchingRestaurantsByCity (searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_CITY,
  searchIsLoading};
}

export function searchingRestaurantsByCitySuccess (restaurants, searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_CITY_SUCCESS,
    restaurants,
  searchIsLoading};
}

export function searchingRestaurantsByCityFail (searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_CITY_FAIL,
    searchIsLoading,
  error};
}
export function searchingRestaurantsByZip (searchIsLoading) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_ZIP,
  searchIsLoading};
}

export function searchingRestaurantsByZipSuccess (restaurants, searchIsLoading, pagerNum) {

  const count = restaurants.pop().NumberofItems;
   return {
    type: types.SEARCHING_RESTAURANTS_BY_ZIP_SUCCESS,
    restaurants,
    searchIsLoading,
    pagerNum,
    count
  };
}

export function searchingRestaurantsByZipFail (searchIsLoading, error) {
  return {
    type: types.SEARCHING_RESTAURANTS_BY_ZIP_FAIL,
    searchIsLoading,
  error};
}

export function loadRestaurants () {
  return function (dispatch) {
    dispatch(loadingRestaurants(true));
    return getRestaurantsApi('all').then((response) => {
      dispatch(loadRestaurantsSuccess(response, false));
    }).catch(error => {
      dispatch(loadRestaurantsFail(false, error));
    });
  };
}

export function searchRestaurants (name) {
  return function (dispatch) {
    dispatch(searchingRestaurantsByName(true));
    return getRestaurantsByNameApi(name).then((response) => {
      dispatch(searchingRestaurantsByNameSuccess(response, false));
    }).catch(error => {
      dispatch(searchingRestaurantsByNameFail(false, error));
    });
  };
}
export function searchCity (city) {
  return function (dispatch) {
    dispatch(searchingRestaurantsByCity(true));
    return getRestaurantsByCityApi(city).then((response) => {
      dispatch(searchingRestaurantsByCitySuccess(response, false));
    }).catch(error => {
      dispatch(searchingRestaurantsByCityFail(false, error));
    });
  };
}
export function searchZip (zip, ratingFilter = 0, resetPager) {
  return function (dispatch, getState) {
    dispatch(searchingRestaurantsByZip(true));
    const pagerNum = (resetPager)? 1: getState().restaurantReviews.pagerNum;
    const pagerNumMod = (pagerNum <= 0) ? 0 : pagerNum - 1;

    return getRestaurantsApi('zip', zip, pagerNumMod, ratingFilter).then((response) => {
      dispatch(searchingRestaurantsByZipSuccess(response, false, pagerNum));
    }).catch(error => {
      dispatch(searchingRestaurantsByZipFail(false, error));
    });
  };
}

// export function searchingRestaurants(searchIsLoading) {
//   return {
//     type: types.SEARCHING_RESTAURANTS,
//     searchIsLoading
//   };
// }
// export function searchingRestaurantsSuccess (restaurants, searchIsLoading, pagerNum) {
//   const count = restaurants.pop().NumberofItems;
//   return {
//     type: types.SEARCHING_RESTAURANTS_SUCCESS,
//     restaurants,
//     searchIsLoading,
//     pagerNum,
//     count
//   };
// }
// export function searchingRestaurantsFail (searchIsLoading, error) {
//   return {
//     type: types.SEARCHING_RESTAURANTS_FAIL,
//     searchIsLoading,
//   error};
// }
// export function searchRestaurantss (value, ratingFilter = 0, resetPager) {
//   return function (dispatch, getState) {
//     dispatch(searchingRestaurants(true));
//     const pagerNum = (resetPager)? 1: getState().restaurantReviews.pagerNum;
//     const pagerNumMod = (pagerNum <= 0) ? 0 : pagerNum - 1;

//     return getRestaurantsApi(value, searchType, pagerNumMod, ratingFilter).then((response) => {
//       dispatch(searchingRestaurants(response, false, pagerNum));
//     }).catch(error => {
//       dispatch(searchingRestaurants(false, error));
//     });
//   };
// }

