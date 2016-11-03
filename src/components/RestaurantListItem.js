import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RestaurantListItem = ({item, activeItem, setActiveItemOnClick}) => {
  const businessName = item.name;
  const businessAddress = item.address;
  const businessCity = item.city;
  const businessZip = item.zip;
  const businessPhone = item.phone;
  const businessRecordId = item.businessRecordId;
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
  const clickHandler = () => setActiveItemOnClick(businessRecordId);

  return (
    <div id={businessRecordId} name={businessRecordId} className={"col-sm-12 item " + (activeItem ? 'active': '')} >
      <div className="row">
        <div className="col-xs-7">
          <p><strong>{businessName}</strong><br />
          {businessAddress}<br />
          {businessCity}, WA {businessZip}<br />
          <span className={(businessPhone) ? 'show' : 'hidden'}><span className="fa fa-phone"/> {businessPhone}</span></p>
        </div>
        <div className="col-xs-5 text-center">
          <p><span className={"fa "+ratingIcon+" fa-3x fa-color-primary"} /></p>
          <p>{ratingString}</p>
          <p><Link to={"/details/"+item.businessRecordId} onClick={clickHandler}>History <span className="fa fa-chevron-right" /></Link></p>
        </div>
        <div className="col-xs-12">
          <div />
        </div>
      </div>
    </div>
  );
};

RestaurantListItem.propTypes = {
  item: PropTypes.object.isRequired,
  activeItem: PropTypes.bool,
  setActiveItemOnClick: PropTypes.func
};

export default RestaurantListItem;
