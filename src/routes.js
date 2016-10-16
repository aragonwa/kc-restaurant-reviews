import React from 'react';
// Index route is used to set the Root Route
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
// import HomePage from './components/home/HomePage';
import RestaurantReviewsPage from './containers/RestaurantReviewsPage';

// Add more routes here:
//   <Route path="/" component={App}>
//     <IndexRoute component={HomePage} />
//     <Route path="/" component={HomePage}>
//       <Route path="details/:id" component={DetailsPage}/>
//     </Route>
//   </Route>
// );

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RestaurantReviewsPage}/>
    <Route path="/" component={RestaurantReviewsPage} />
  </Route>
);
