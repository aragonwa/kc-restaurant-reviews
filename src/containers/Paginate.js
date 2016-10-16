import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import PaginateItem from '../components/Paginate';

export const Paginate = (props) => {
  return (
    <PaginateItem
      decreasePagerNum={props.actions.decreasePagerNum}
      increasePagerNum={props.actions.increasePagerNum}
      pagerNum={props.pagerNum}
      restaurants={props.restaurants}
      itemsPerPage={10}
    />
  );
};

Paginate.propTypes = {
  pagerNum: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    pagerNum: state.restaurantReviews.pagerNum,
    restaurants: state.restaurantReviews.restaurants
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
