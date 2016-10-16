// Set up your root reducer here...
import { combineReducers } from 'redux';
import restaurantReviews from './restaurantReviewsReducers';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  restaurantReviews,
  routing: routerReducer
});

export default rootReducer;
