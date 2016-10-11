import React from 'react';
      //   <p className="pull-right">
      //     <a href="#refineSearch" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="refineSearch">
      //       <span className="fa fa-sliders" /> Refine search <span className="fa fa-chevron-down" />
      //     </a>
      //   </p>
      //   <span className="clearfix" />
      //   <div className="collapse" id="refineSearch">
      //     <div className="well">Refine Search</div>
      //   </div>
      // </div>
      //  <div className="col-sm-12">
      //   <p className="pull-right">
      //     <a href="#sortBy" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="sortBy">Sort by <span className="fa fa-chevron-down"/></a>
      //   </p>
      //   <span className="clearfix" />
      //   <div className="collapse" id="sortBy">
      //     <div className="well">SortBy</div>
      //   </div>
      // </div>

const RestaurantFilterSearch = () => {
  return (
    <div>
      <div className="col-sm-12" style={{backgroundColor:'#CCC', marginBottom: '15px'}}>
        <br />
        <label htmlFor="restaurantInput">Restaurant name and location</label>
        <div className="input-group" style={{paddingBottom: '20px'}}>
          <input type="text" className="form-control" id="restaurantInput" placeholder="Location" />
          <span className="input-group-btn">
            <button className="btn btn-primary" type="button"><span className="fa fa-search" /></button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFilterSearch;
