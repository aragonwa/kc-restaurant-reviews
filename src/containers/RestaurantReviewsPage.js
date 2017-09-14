import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/restaurantReviewsActions';
import RestaurantReviewsList from '../components/RestaurantReviewsList';
import SearchInput from '../components/SearchInput';
import Filters from '../utils/Filters';
import Paginate from './Paginate'; // eslint-disable-line import/no-named-as-default
import GMap from '../components/GMap'; // eslint-disable-line import/no-named-as-default

export const RestaurantReviewsPage = (props) => {
  const childrenWithProps = React.Children.map(props.children,
    (child) => React.cloneElement(child, {
      restaurants: props.restaurantReviews.restaurants
    })
  );

  let showResults;
  if (props.searchIsLoading|| props.loading) {
    showResults = (
      <div className="col-sm-12">
        <div className="text-center m-a-lg">
          <span className="fa fa-spinner fa-4x fa-spin" />
        </div>
      </div>
    );
  } else if (!props.loading && props.loadingError) {
    showResults = (
      <div className="col-sm-12">
        <div className="alert alert-danger"><h2>An error occurred while loading restaurants.</h2></div>
      </div>
    );
  } else {
    showResults = (
      <div>
        <div className={(props.filteredPagerRestaurants.length > 0) ? 'col-sm-6 col-sm-push-6 col-lg-7 col-lg-push-5 col-xs-12' : 'hidden'} id="results-map">
          <GMap
            restaurants={props.filteredPagerRestaurants}
            activeItem={props.activeItem}
            setActiveItem={props.actions.setActiveItem}
          />
        </div>
        <div className={(props.filteredPagerRestaurants.length === 0) ? 'col-sm-12 col-xs-12' : 'col-sm-6 col-sm-pull-6 col-lg-5 col-lg-pull-7 col-xs-12'} id="results-list" style={(props.filteredPagerRestaurants.length === 0) ? { paddingRight: '20px' } : {}}>
          <RestaurantReviewsList
            updateFilter={props.actions.updateFilter}
            restaurantReviews={props.filteredPagerRestaurants}
            pagerNum={props.pagerNum}
            setActiveItem={props.actions.setActiveItem}
            activeItem={props.activeItem}
            scroll={props.scroll}
          />
          <Paginate />
        </div>
      </div>
    );
  }

  return (
    <div>
      {childrenWithProps}
      <SearchInput
        updateFilter={props.actions.updateFilter}
        setActiveItem={props.actions.setActiveItem}
        history={props.history}
        searchRestaurants={props.actions.searchRestaurants}
        searchCity={props.actions.searchCity}
        searchZip={props.actions.searchZip}
        searchTerm={props.params.searchTerm}
        name="restaurant-reviews-filter"
      />
      <div className="row" id="results">
        {showResults}

        <div className="col-xs-12" >
          <div className="col-xs-12" style={{ borderTop: "1px solid #CCCCCC", paddingTop: "15px" }}>
            <ul className="list-unstyled">
              <li><a href="http://www.kingcounty.gov/depts/health/environmental-health/food-safety/inspection-system/closures.aspx">Restaurant closure list</a></li>
              <li><a href="http://www.kingcounty.gov/depts/health/communicable-diseases/disease-control/outbreak.aspx">Disease outbreak information</a></li>
              <li><a href="https://data.kingcounty.gov/Health/Food-Establishment-Inspection-Data/f29f-zza5">Explore all data for King County food establishment inspections</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

RestaurantReviewsPage.propTypes = {
  pagerNum: PropTypes.number.isRequired,
  restaurantReviews: PropTypes.array.isRequired,
  restaurantNumTotal: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingError: PropTypes.bool,
  actions: PropTypes.object.isRequired,
  children: PropTypes.element,
  filteredPagerRestaurants: PropTypes.array.isRequired,
  activeItem: PropTypes.string,
  filter: PropTypes.string,
  scroll: PropTypes.bool,
  history: PropTypes.object.isRequired,
  searchIsLoading: PropTypes.bool,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const { filter, restaurants, pagerNum } = state.restaurantReviews;

  //TODO: move to function above http://stackoverflow.com/questions/38133137/how-to-filter-and-sort-the-same-array-of-object-state-in-redux
  let filteredRestaurants;

  if (ownProps.params.searchTerm) {
    filteredRestaurants = Filters.alphaSort(restaurants.filter(item => {
      return item.businessName.toLowerCase().includes(ownProps.params.searchTerm.toLowerCase());
    }));
  } else {
    filteredRestaurants = Filters.filterRestaurants(restaurants, '');
  }


  // if (!initialLoad) {
  //   //Filters.alphaSort(filteredRestaurants);
  // }

  const filteredPagerRestaurants = Filters.filterPagerItems(filteredRestaurants, pagerNum);

  return {
    filter: filter,
    restaurantNumTotal: restaurants.length,
    restaurantReviews: filteredRestaurants,
    filteredPagerRestaurants: filteredRestaurants,
    loading: state.restaurantReviews.loading,
    pagerNum: state.restaurantReviews.pagerNum,
    loadingError: state.restaurantReviews.loadingError,
    searchIsLoading: state.restaurantReviews.searchIsLoading,
    activeItem: state.restaurantReviews.activeItem,
    scroll: state.restaurantReviews.scroll
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
