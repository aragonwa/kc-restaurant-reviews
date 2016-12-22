import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import RestaurantReviewsList from '../components/RestaurantReviewsList';
import SearchInput from '../components/SearchInput';
import Filters from '../utils/Filters';
import Paginate from './Paginate'; // eslint-disable-line import/no-named-as-default
import GMap from '../components/GMap'; // eslint-disable-line import/no-named-as-default

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
        <div className={(props.filteredPagerRestaurants.length === 0) ? 'col-sm-12 col-xs-12': 'col-sm-6 col-xs-12'} id="results-list" style={(props.filteredPagerRestaurants.length === 0) ? {paddingRight:'20px'}:{}}>
          <SearchInput
            updateFilter={props.actions.updateFilter}
            setActiveItem={props.actions.setActiveItem}
            name="restaurant-reviews-filter"
          />
          <RestaurantReviewsList
            updateFilter={props.actions.updateFilter}
            restaurantReviews={props.filteredPagerRestaurants}
            pagerNum={props.pagerNum}
            setActiveItem={props.actions.setActiveItem}
            activeItem={props.activeItem}
            scroll={props.scroll}
          />
          <Paginate />
        </div>
        <div className={(props.filteredPagerRestaurants.length > 0) ? 'col-sm-6 col-xs-12': 'hidden'}  id="results-map">
          <GMap
            restaurants={props.filteredPagerRestaurants}
            activeItem={props.activeItem}
            setActiveItem={props.actions.setActiveItem}
            pagerNum={props.pagerNum}
            scroll={props.scroll}
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
  loadingError: PropTypes.object,
  actions: PropTypes.object.isRequired,
  children: PropTypes.element,
  filteredPagerRestaurants: PropTypes.array.isRequired,
  activeItem: PropTypes.string,
  filter: PropTypes.string,
  scroll: PropTypes.bool
};

function mapStateToProps(state) {
  const {filter, restaurants, pagerNum} = state.restaurantReviews;

  const filteredRestaurants = Filters.filterRestaurants(restaurants, filter);
  //Move this to utils function
  filteredRestaurants.sort((a,b) => {
    if(a.businessName.toLowerCase() < b.businessName.toLowerCase()) return -1;
    if(a.businessName.toLowerCase() > b.businessName.toLowerCase()) return 1;
    return 0;
  });
  const filteredPagerRestaurants = Filters.filterPagerItems(filteredRestaurants, pagerNum);

  return {
    filter: filter,
    restaurantReviews: filteredRestaurants,
    filteredPagerRestaurants: filteredPagerRestaurants,
    loading: state.restaurantReviews.loading,
    pagerNum: state.restaurantReviews.pagerNum,
    loadingError: state.restaurantReviews.loadingError,
    activeItem: state.restaurantReviews.activeItem,
    scroll: state.restaurantReviews.scroll
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
