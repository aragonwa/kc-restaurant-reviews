import React from 'react';
import RestaurantMap from './map/RestaurantMap';
import RestaurantList from './list/RestaurantList';
import RestaurantSearch from './search/RestaurantSearch';

const HomePage = () => {
  return (
    <div>
      <div className="col-sm-4">
        <div className="row">
          <RestaurantSearch />
          <RestaurantList/>
        </div>
      </div>
      <RestaurantMap />
    </div>
  );
};

export default HomePage;
