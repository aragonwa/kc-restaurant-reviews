import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RestaurantListItem = ({item}) => {
  const businessName = item.name;
  const businessAddress = item.address;
  const businessCity = item.city;

  return (
    <div className="col-sm-12 item">
      <div className="row">
        <div className="col-xs-7">
          <p><strong>{businessName}</strong><br />
          {businessAddress}<br />
          {businessCity}, WA {item.businessLocationZip}<br />
          (206) 263-2000</p>
        </div>
        <div className="col-xs-5 text-center">
          <p><span className="fa fa-smile-o fa-3x fa-color-primary" /></p>
          <p>Satisfactory</p>
          <p><Link to={"/details/"}>History <span className="fa fa-chevron-right" /></Link></p>
        </div>
        <div className="col-xs-12">
          <div></div>
        </div>
      </div>
    </div>
  );
};

RestaurantListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default RestaurantListItem;
