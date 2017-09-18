import React, {PropTypes} from 'react';
import RestaurantListItem from './RestaurantListItem';
import RestaurantReviewFilterPanel from './RestaurantReviewFilterPanel';
import StringHelper from '../utils/StringHelper';
import {PAGER_ITEMS_PER_PAGE as itemsPerPage} from '../constants/appSettings';
import PagerNumbers from './PagerNumbers';

class RestaurantReviewsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sliderVisible: false
    };
    this.displaySlider = this.displaySlider.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
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

  displaySlider() {
    this.setState({ sliderVisible: !this.state.sliderVisible });
  }
  applyFilters() {
    this.displaySlider();
  }

  render() {
    //TODO: move to stylesheet
    const style = {
      fontSize: '20px'
    };
    const {restaurantReviews, activeItem, count, pagerNum} = this.props;
    const len = restaurantReviews.length;
    const error = (
      <div id="restaurant-list">
        <div style={style} className="alert alert-danger" role="alert">
          <p><span className="fa fa-exclamation-triangle" /> Sorry, no results for your search.</p>
          <p>Try a different search term or filter.</p>
        </div>
      </div>
    );

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
      <div>
        <div className="col-sm-12 m-t p-b" style={{ borderBottom: "4px solid #3c7893" }}>
          <div className="pull-right">
            <button className="btn btn-link p-t-0" onClick={this.displaySlider}><strong>Filter</strong> <span className="fa fa-sliders" /></button>
          </div>
          <p className="m-b-0"><PagerNumbers pagerNum={pagerNum} itemsPerPage={itemsPerPage} count={count}/></p>
        </div>
        <div id="restaurant-list">
          <div className={(this.state.sliderVisible) ? 'filter-slider-hide' : 'filter-slider-show'}>
            {(len <= 0) ? error : displayRows}
          </div>
          <div className={(this.state.sliderVisible) ? 'filter-slider' : 'filter-slider close'}>
            <div className="col-sm-12 filter-slider-panel">
              <button className="btn btn-link pull-right" onClick={this.displaySlider}><span className="fa fa-times fa-lg" /></button>
              <p className="h3">Refine search</p>
                <RestaurantReviewFilterPanel setRatingFilter={this.props.setRatingFilter} ratingFilter={this.props.ratingFilter}  displaySlider={this. displaySlider}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RestaurantReviewsList.propTypes = {
  restaurantReviews: PropTypes.array.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
  setRatingFilter:PropTypes.func.isRequired,
  pagerNum: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string,
  scroll: PropTypes.bool,
  ratingFilter: PropTypes.number.isRequired,
  count: PropTypes.number
};

export default RestaurantReviewsList;
