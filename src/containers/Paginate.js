import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import PaginateItem from '../components/Paginate';
import Filters from '../utils/Filters';

export const Paginate = (props) => {
  return (
    <PaginateItem
      decreasePagerNum={props.actions.decreasePagerNum}
      increasePagerNum={props.actions.increasePagerNum}
      pagerNum={props.pagerNum}
      restaurants={props.restaurants}
      itemsPerPage={10}
      filter={props.filter}
    />
  );
};

Paginate.propTypes = {
  pagerNum: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {filter, restaurants} = state.restaurantReviews;
  const filteredRestaurants = Filters.filterRestaurants(restaurants, filter);
  return {
    pagerNum: state.restaurantReviews.pagerNum,
    restaurants: filteredRestaurants,
    filter: state.restaurantReviews.filter,
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
)(Paginate);
