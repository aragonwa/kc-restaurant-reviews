import React, {PropTypes} from 'react';
// import FuelSavingsResults from './FuelSavingsResults';
import RestaurantListItem from './home/list/RestaurantListItem';
import TextInput from './TextInput';
import _ from 'underscore';

class RestaurantReviewsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     textVal: ''
    };
    this.restaurantReviewsFilterKeypress = this.restaurantReviewsFilterKeypress.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  restaurantReviewsFilterKeypress(e) {
    this.setState({textVal: e.target.value});
  }

  updateFilter(){
    this.props.updateFilter(this.state.textVal);
  }

  _capitalCase (str) {
    return str.toLowerCase().replace(/\b[a-z]/g,function(char) { return char.toUpperCase();});
  }

  render() {
    const {restaurantReviews} = this.props;
    const {textVal} = this.state;

    let displayRows = [];
    let len = restaurantReviews.restaurants.length;
    for(let i=0; i < len; i++){

      const item = restaurantReviews.restaurants[i];
      const business = {};
      business.name = this._capitalCase(item.businessName);
      business.address = this._capitalCase(item.businessAddress);
      business.city = this._capitalCase(item.businessCity);
      business.zip = item.businessLocationZip;
      if((business.name.toLowerCase()).includes((restaurantReviews.filter).toLowerCase())) {
        displayRows.push(<RestaurantListItem key={i} item={business} />);
      }
    }

    displayRows = _.first((_.rest(displayRows, [(restaurantReviews.pagerNum - 1) * 10])), 10);

    return (
      <div>
        <TextInput
          onChange={this.restaurantReviewsFilterKeypress}
          onClick={this.updateFilter}
          name="restaurant-reviews-filter"
          value={textVal}
        />
        {displayRows}
      </div>
    );
  }
}

RestaurantReviewsList.propTypes = {
  restaurantReviews: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired
};

export default RestaurantReviewsList;
