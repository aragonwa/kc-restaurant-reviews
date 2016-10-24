import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import RestaurantReviewsList from '../components/RestaurantReviewsList';
import SearchInput from '../components/SearchInput';
import Filters from '../utils/Filters';
import Paginate from './Paginate'; // eslint-disable-line import/no-named-as-default

export const RestaurantReviewsPage = (props) => {
  if(props.loading) {
    return (
      <div className="col-sm-12">
        <span className="fa fa-spinner fa-4x fa-spin"/>
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
      <SearchInput
        updateFilter={props.actions.updateFilter}
        name="restaurant-reviews-filter"
      />
      <RestaurantReviewsList
        updateFilter={props.actions.updateFilter}
        restaurantReviews={props.restaurantReviews}
        pagerNum={props.pagerNum}
      />
      <Paginate />
    </div>
  );
};

RestaurantReviewsPage.propTypes = {
  pagerNum: PropTypes.number.isRequired,
  restaurantReviews: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {filter, restaurants} = state.restaurantReviews;
  const filteredRestaurants = Filters.filterRestaurants(restaurants, filter);
  return {
    restaurantReviews: filteredRestaurants,
    loading: state.restaurantReviews.loading,
    pagerNum: state.restaurantReviews.pagerNum
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
