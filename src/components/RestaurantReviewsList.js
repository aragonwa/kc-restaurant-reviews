import React, {PropTypes} from 'react';
// import FuelSavingsResults from './FuelSavingsResults';
import RestaurantListItem from './home/list/RestaurantListItem';
import TextInput from './TextInput';

class RestaurantReviewsList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.restaurantReviewsFilterKeypress = this.restaurantReviewsFilterKeypress.bind(this);
  }

  restaurantReviewsFilterKeypress(value) {
    this.props.updateFilter(value);
  }

   _capitalCase (str) {
    return str.toLowerCase().replace(/\b[a-z]/g,function(char) { return char.toUpperCase();});
  }

  render() {
    const {restaurantReviews} = this.props;

    let displayRows = [];
    let len = restaurantReviews.restaurants.length;
    for(let i=0; i < len; i++){

      const item = restaurantReviews.restaurants[i];
      const business = {};
      business.name = this._capitalCase(item.businessName);
      business.address = this._capitalCase(item.businessAddress);
      business.city = this._capitalCase(item.businessCity);
      if((business.name.toLowerCase()).includes((restaurantReviews.filter).toLowerCase())) {
        displayRows.push(<RestaurantListItem key={i} item={business} />);
      }
    }

    return (
      <div>
        <TextInput
          onChange={this.restaurantReviewsFilterKeypress}
          name="restaurant-reviews-filter"
          value={restaurantReviews.filter}
        />
        {displayRows}
      </div>
    );
  }
}

RestaurantReviewsList.propTypes = {
  restaurantReviews: PropTypes.object.isRequired
};

export default RestaurantReviewsList;
