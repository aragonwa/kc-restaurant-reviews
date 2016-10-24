import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RestaurantListItem = ({item}) => {
  const businessName = item.name;
  const businessAddress = item.address;
  const businessCity = item.city;
  const rating = Math.floor(Math.random() * 3) + 1;
  let ratingIcon;
  let ratingString;
  switch (rating) {
    case 1:
      ratingIcon = "fa-smile-o";
      ratingString = "Satisfactory";
      break;
    case 2:
      ratingIcon = "fa-meh-o";
      ratingString = "On warning";
      break;
    case 3:
      ratingIcon = "fa-frown-o";
      ratingString = "Unsatisfactory";
      break;
  }

  return (
    <div className="col-sm-12 item">
      <div className="row">
        <div className="col-xs-7">
          <p><strong>{businessName}</strong><br />
          {businessAddress}<br />
          {businessCity}, WA {item.businessZip}<br />
          555-555-5555</p>
        </div>
        <div className="col-xs-5 text-center">
          <p><span className={"fa "+ratingIcon+" fa-3x fa-color-primary"} /></p>
          <p>{ratingString}</p>
          <p><Link to={"/details/"+item.businessRecordId}>History <span className="fa fa-chevron-right" /></Link></p>
        </div>
        <div className="col-xs-12">
          <div />
        </div>
      </div>
    </div>
  );
};

RestaurantListItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default RestaurantListItem;
