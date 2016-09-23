import React from 'react';

const RestaurantList  = () => {
  return (
    <div>
      <div className="col-sm-12 item" id="1">
        <div className="row">
          <div className="col-xs-7">
            <p><a href="#" className="restaurantTitle">China Tea Pot</a></p>
            <p>1423 Button way South</p>
            <p>Seattle, WA 98168</p>
            <p>(206) 263-2000</p>
          </div>
          <div className="col-xs-5 text-center">
            <p><span className="fa fa-smile-o fa-3x" /></p>
            <p>Satisfactory</p>
            <p><a href="#">History <span className="fa fa-chevron-right" /></a></p>
          </div>
        </div>
      </div>
      <div className="col-sm-12 item" id="2">
        <div className="row">
          <div className="col-xs-7">
            <p><a href="#" className="restaurantTitle">Red China Cafe</a></p>
            <p>14857 Washington Street</p>
            <p>Seattle, WA 98102</p>
            <p>(206) 263-2000</p>
          </div>
          <div className="col-xs-5 text-center">
            <p><span className="fa fa-meh-o fa-3x" /></p>
            <p>On Warning</p>
            <p><a href="#">History <span className="fa fa-chevron-right" /></a></p>
          </div>
        </div>
      </div>
      <div className="col-sm-12 item" id="3">
        <div className="row">
          <div className="col-xs-7">
            <p><a href="#" className="restaurantTitle">Red China Cafe</a></p>
            <p>14857 Washington Street</p>
            <p>Seattle, WA 98102</p>
            <p>(206) 263-2000</p>
          </div>
          <div className="col-xs-5 text-center">
            <p><span className="fa fa-frown-o fa-3x" /></p>
            <p>Unsatisfactory</p>
            <p><a href="#">History <span className="fa fa-chevron-right" /></a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
