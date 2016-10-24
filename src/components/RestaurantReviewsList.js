import React, {PropTypes} from 'react';
import RestaurantListItem from './RestaurantListItem';
import _ from 'underscore';
import StringHelper from '../utils/StringHelper';

class RestaurantReviewsList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {restaurantReviews, pagerNum} = this.props;

    let displayRows = [];
    const len = restaurantReviews.length;

    for(let i=0; i < len; i++){
      const item = restaurantReviews[i];
      const business = {};
      business.name = StringHelper.capitalCase(item.businessName);
      business.address = StringHelper.capitalCase(item.businessAddress);
      business.city = StringHelper.capitalCase(item.businessCity);
      business.zip = item.businessLocationZip;
      business.businessRecordId = item.businessRecordId;

      displayRows.push(<RestaurantListItem key={i} item={business} />);
    }

    displayRows = _.first((_.rest(displayRows, [(pagerNum - 1) * 10])), 10);

    return (
      <div>
        {displayRows}
      </div>
    );
  }
}

RestaurantReviewsList.propTypes = {
  restaurantReviews: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired,
  pagerNum: PropTypes.number.isRequired
};

export default RestaurantReviewsList;
