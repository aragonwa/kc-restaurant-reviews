import React from 'react';
// Index route is used to set the Root Route
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './components/App';
import RestaurantReviewsPage from './containers/RestaurantReviewsPage'; // eslint-disable-line import/no-named-as-default
import Details from './components/Details';

//Todo: not found page <Route path="*" component={NotFoundPage}/>
const baseDir = (process.env.NODE_ENV === 'production') ? '/depts/health/environmental-health/food-safety/inspection-system/search#' :'';
export default (
<Route path={baseDir + '/'} component={App}>
  <IndexRoute component={RestaurantReviewsPage}/>
  <Route path="/" component={RestaurantReviewsPage}>
    <Redirect from="/details/" to="/" />
    <Route path={'/details/:id'} component={Details} />
  </Route>
  <Route path="/search/:searchTerm" component={RestaurantReviewsPage} />
  <Route path="*" component={RestaurantReviewsPage}/>
</Route>
);
