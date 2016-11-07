import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import RestaurantReviewsList from '../components/RestaurantReviewsList';
import SearchInput from '../components/SearchInput';
import Filters from '../utils/Filters';
import Paginate from './Paginate'; // eslint-disable-line import/no-named-as-default
import Map from '../components/GMap'; // eslint-disable-line import/no-named-as-default

export const RestaurantReviewsPage = (props) => {
  if(props.loading) {
    return (
      <div className="col-sm-12">
        <span className="fa fa-spinner fa-4x fa-spin"/>
      </div>
    );
  }
  if(!props.loading && props.loadingError) {
    return (
      <div className="col-sm-12">
        <div className="alert alert-danger"><h2>An error occured while loading restaurants.</h2></div>
      </div>
    );
  }
  const childrenWithProps = React.Children.map(props.children,
    (child) => React.cloneElement(child, {
      restaurants: props.restaurantReviews.restaurants
    })
  );
  return (
    <div>
      {childrenWithProps}
      <div className="row reorder-xs" id="results">
        <div className="col-sm-6 col-xs-12" id="results-list">
          <SearchInput
            updateFilter={props.actions.updateFilter}
            name="restaurant-reviews-filter"
          />
          <RestaurantReviewsList
            updateFilter={props.actions.updateFilter}
            restaurantReviews={props.filteredPagerRestaurants}
            pagerNum={props.pagerNum}
            setActiveItem={props.actions.setActiveItem}
            activeItem={props.activeItem}
          />
          <Paginate />
        </div>
        <div className="col-sm-6 col-xs-12" id="results-map">
          <Map
            filter={props.filter}
            setActiveItem={props.actions.setActiveItem}
            restaurants={props.filteredPagerRestaurants}
            pagerNum={props.pagerNum}
          />
        </div>
      </div>
    </div>
  );
};

RestaurantReviewsPage.propTypes = {
  pagerNum: PropTypes.number.isRequired,
  restaurantReviews: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingError: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  children: PropTypes.element,
  filteredPagerRestaurants: PropTypes.array.isRequired,
  activeItem: PropTypes.string 
};

function mapStateToProps(state) {
  const {filter, restaurants, pagerNum} = state.restaurantReviews;
  const filteredRestaurants = Filters.filterRestaurants(restaurants, filter);
  const filteredPagerRestaurants = Filters.filterPagerItems(filteredRestaurants, pagerNum);
  return {
    filter: filter,
    restaurantReviews: filteredRestaurants,
    filteredPagerRestaurants: filteredPagerRestaurants,
    loading: state.restaurantReviews.loading,
    pagerNum: state.restaurantReviews.pagerNum,
    loadingError: state.restaurantReviews.loadingError,
    activeItem: state.restaurantReviews.activeItem
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantReviewsPage);
