/* eslint-disable import/default */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
// import {Router, browserHistory} from 'react-router';
import {Router, useRouterHistory} from 'react-router';
//import {Router, hashHistory, useRouterHistory} from 'react-router';
import { createHashHistory } from 'history';
import routes from './routes';
import {loadRestaurants} from './actions/restaurantReviewsActions';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import {syncHistoryWithStore} from 'react-router-redux';

const store = configureStore();

//Load restaurants on load
store.dispatch(loadRestaurants());

//TODO: for production add a subdirectory: https://github.com/reactjs/react-router-redux/issues/414
// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store);
//https://github.com/ReactTraining/react-router/issues/1967
const appHashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const history = syncHistoryWithStore(appHashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>, document.getElementById('app')
);

