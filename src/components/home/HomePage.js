import React from 'react';
import RestaurantMap from './map/RestaurantMap';
import RestaurantList from './list/RestaurantList';
import RestaurantSearch from './search/RestaurantSearch';

const HomePage = (props) => {
  return (
    <div>
      <div className="col-sm-4">
        <div className="row">
          {props.children && React.cloneElement(props.children, {data: props.data})}
          <RestaurantSearch />
          <RestaurantList data={props.data}/>
        </div>
      </div>
      <RestaurantMap data={props.data} />
    </div>
  );
};

export default HomePage;
