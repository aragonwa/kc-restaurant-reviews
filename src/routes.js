import React from 'react';
// Index route is used to set the Root Route
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import DetailsPage from './components/details/DetailsPage';

// Add more routes here:
// examples:
// <IndexRoute component={HomePage} />
// <Route path="about" component={AboutPage} />
// <Route path="courses" component={CoursesPage} />

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/" component={HomePage}>
      <Route path="details/:id" component={DetailsPage}/>
    </Route>
  </Route>
);
