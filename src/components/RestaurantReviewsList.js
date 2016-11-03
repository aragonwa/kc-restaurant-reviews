import React, {PropTypes} from 'react';
import RestaurantListItem from './RestaurantListItem';
import StringHelper from '../utils/StringHelper';
import Filters from '../utils/Filters';
import Scroll from 'react-scroll';

class RestaurantReviewsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.setActiveItemOnClick = this.setActiveItemOnClick.bind(this);
  }

  componentDidUpdate() {
    //TODO: http://stackoverflow.com/questions/9880472/determine-distance-from-the-top-of-a-div-to-top-of-window-with-javascript/9880571
    // Get help with this
    const scrollTop = $('#restaurant-list').scrollTop();
    const elementOffset = $('#'+this.props.activeItem).offset().top;
    const diff = scrollTop - elementOffset;

    Scroll.animateScroll.scrollTo(elementOffset, {containerId: 'restaurant-list'});
  }

  setActiveItemOnClick (id){
    this.props.setActiveItem(id);
  }

  render() {
    const {restaurantReviews, pagerNum, activeItem} = this.props;

    let displayRows = [];
    const len = restaurantReviews.length;
    //TODO: Reformat to use map function
    for(let i=0; i < len; i++){
      const item = restaurantReviews[i];
      const business = {};
      const activeState = (activeItem === item.businessRecordId) ? true : false;

      business.name = StringHelper.capitalCase(item.businessName);
      business.address = StringHelper.capitalCase(item.businessAddress);
      business.city = StringHelper.capitalCase(item.businessCity);
      business.zip = item.businessLocationZip;
      business.phone = StringHelper.phoneNumFormat(item.businessPhone);
      business.businessRecordId = item.businessRecordId;

      displayRows.push(<RestaurantListItem key={i} item={business} activeItem={activeState} setActiveItemOnClick={this.setActiveItemOnClick}/>);
    }

    displayRows = Filters.filterPagerItems(displayRows, pagerNum);

    return (
      <div style={{height: '600px', overflow:'auto',clear:'both', position:'relative'}} id="restaurant-list">
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
  activeItem: PropTypes.string
};

export default RestaurantReviewsList;
