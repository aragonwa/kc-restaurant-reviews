import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import RestaurantReviewsList from '../components/RestaurantReviewsList';

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
      <RestaurantReviewsList
        updateFilter={props.actions.updateFilter}
        restaurantReviews={props.restaurantReviews}
      />
    </div>
  );
};

RestaurantReviewsPage.propTypes = {
  children: PropTypes.element,
  restaurantReviews: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    restaurantReviews: state.restaurantReviews,
    loading: state.restaurantReviews.loading
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
