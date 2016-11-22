import React from 'react';
// Index route is used to set the Root Route
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './components/App';
import RestaurantReviewsPage from './containers/RestaurantReviewsPage'; // eslint-disable-line import/no-named-as-default
import Details from './components/Details';

//Todo: not found page <Route path="*" component={NotFoundPage}/>
let baseDir = '';
if(process.env.NODE_ENV === 'production') {
  baseDir = '/help/test/alex/restaurant-app/#';
}

export default (
  <Route path={baseDir + '/'} component={App}>
    <IndexRoute component={RestaurantReviewsPage}/>
    <Route path="/" component={RestaurantReviewsPage}>
      <Redirect from="/details/" to="/" />
      <Route path={baseDir + '/details/:id'} component={Details} />
    </Route>
    <Route path="*" component={RestaurantReviewsPage}/>
  </Route>
);
