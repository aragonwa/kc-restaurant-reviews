import React, {PropTypes} from 'react';
import RestaurantListItem from './RestaurantListItem';
import StringHelper from '../utils/StringHelper';

class RestaurantReviewsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setActiveItemOnClick = this.setActiveItemOnClick.bind(this);
  }

  componentDidUpdate() {
    //TODO: http://stackoverflow.com/questions/9880472/determine-distance-from-the-top-of-a-div-to-top-of-window-with-javascript/9880571
    if(this.props.scroll) {
      let position = 0;
      if(this.props.activeItem && this.props.restaurantReviews.length > 0){
        const topPos = document.getElementById(this.props.activeItem).offsetTop;
        position = topPos-99;
      }
      document.getElementById('restaurant-list').scrollTop = position;
    }
  }

  setActiveItemOnClick (id, scroll){
    this.props.setActiveItem(id, scroll);
  }

  render() {
    //TODO: move to stylesheet
    const style = {
      fontSize: '20px'
    };
    const {restaurantReviews, activeItem} = this.props;
    const len = restaurantReviews.length;

    if(len <= 0){
      return (
        <div id="restaurant-list">
          <div style={style} className="alert alert-danger" role="alert">
            <p><span className="fa fa-exclamation-triangle"/> Sorry, no results for your search.</p>
            <p>Try a different search term.</p>
          </div>
        </div>
      );
    }

    const displayRows = restaurantReviews.map((restaurant, index) => {
      const id = restaurant.businessRecordId;
      const grade = restaurant.businessGrade;
      const name = StringHelper.capitalCase(restaurant.businessName);
      const address =  StringHelper.capitalCase(restaurant.businessAddress);
      const city = StringHelper.capitalCase(restaurant.businessCity);
      const zip = restaurant.businessLocationZip;
      const phone = StringHelper.phoneNumFormat(restaurant.businessPhone);
      const activeState = (activeItem === id) ? true : false;
      const programIdentifier = (restaurant.businessProgramIdentifier) ? StringHelper.capitalCase(restaurant.businessProgramIdentifier): '';
      const business = {name, address, city, zip, phone, id, grade, programIdentifier};
      return (<RestaurantListItem key={index} item={business} activeItem={activeState} setActiveItemOnClick={this.setActiveItemOnClick}/>);
    });

    return (
      <div id="restaurant-list">
        {displayRows}
      </div>
    );
  }
}

RestaurantReviewsList.propTypes = {
  restaurantReviews: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired,
  pagerNum: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  scroll: PropTypes.bool
};

export default RestaurantReviewsList;
