import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Ratings from '../utils/Ratings';

const RestaurantListItem = ({item, activeItem, setActiveItemOnClick}) => {
  const name = item.name;
  const address = item.address;
  const city = item.city;
  const zip = item.zip;
  const phone = item.phone;
  const id = item.id;
  const rating = Ratings.getRatings(item.rating);

  const clickHandler = () => setActiveItemOnClick(id);

  return (
    <div id={id} name={id} className={"col-sm-12 item " + (activeItem ? 'active': '')} >
      <div className="row">
        <div className="col-xs-7">
          <p><strong>{name}</strong><br />
          {address}<br />
          {city}, WA {zip}<br />
          <span className={(phone) ? 'show' : 'hidden'}><span className="fa fa-phone"/> {phone}</span></p>
        </div>
        <div className="col-xs-5 text-center">
          <p><span className={"fa "+rating.icon+" fa-3x fa-color-primary"} /></p>
          <p>{rating.string}</p>
          <p><Link to={"/details/"+id} onClick={clickHandler}>History <span className="fa fa-chevron-right" /></Link></p>
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
