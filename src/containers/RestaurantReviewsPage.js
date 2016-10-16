import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import RestaurantReviewsList from '../components/RestaurantReviewsList';

export const RestaurantReviewsPage = (props) => {
  return (
    <RestaurantReviewsList
      updateFilter={props.actions.updateFilter}
      restaurantReviews={props.restaurantReviews}
    />
  );
};

RestaurantReviewsPage.propTypes = {
  restaurantReviews: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    restaurantReviews: state.restaurantReviews
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
