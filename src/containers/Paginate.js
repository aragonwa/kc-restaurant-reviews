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
      filter={props.filter}
      setActiveItem={props.actions.setActiveItem}
      count={props.count}
    />
  );
};

Paginate.propTypes = {
  pagerNum: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  restaurants: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  count: PropTypes.num
};

function mapStateToProps(state) {
  const {filter, restaurants, pagerNum} = state.restaurantReviews;
  const filteredRestaurants = Filters.filterRestaurants(restaurants, filter);
  return {
    pagerNum: pagerNum,
    restaurants: filteredRestaurants,
    filter: filter,
    count: state.restaurantReviews.count
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
