import React from 'react';
// Index route is used to set the Root Route
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
// import HomePage from './components/home/HomePage';
import RestaurantReviewsPage from './containers/RestaurantReviewsPage'; // eslint-disable-line import/no-named-as-default
import DetailsPage from './components/details/DetailsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RestaurantReviewsPage}/>
    <Route path="/" component={RestaurantReviewsPage}>
      <Route path="details/:id" component={DetailsPage} />
    </Route>
  </Route>
);
