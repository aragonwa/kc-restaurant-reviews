import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Ratings from '../utils/Ratings';

const RestaurantListItem = ({item, activeItem, setActiveItemOnClick}) => {
  const programIdentifier = item.programIdentifier;
  const name = (!programIdentifier || programIdentifier === item.name)? item.name : (item.name + ', ' + programIdentifier);
  const address = item.address;
  const city = item.city;
  const zip = item.zip;
  const phone = item.phone;
  const id = item.id;
  const rating = Ratings.getRatings(item.grade);

  //TODO: move to style sheet
  const style = {display: 'inline'};

  const clickHandler = () => setActiveItemOnClick(id, false);

  return (
    <div onClick={clickHandler} id={id} name={id} className={"col-sm-12 item " + (activeItem ? 'active': '')} >
      <div className="row">
        <div className="col-xs-7">
          <p><strong>{name}</strong><br />
          {address}<br />
          {city}, WA {zip}<br />
          <span className={(phone) ? 'show' : 'hidden'}><span className="fa fa-phone"/> {phone}</span></p>
        </div>
        <div className="col-xs-5 text-center">
          <p><img style={style} className="img-rounded" alt={rating.string} src={require('../assets/img/'+rating.img+'_50.gif')}/></p>
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
  setActiveItemOnClick: PropTypes.func,
  scroll: PropTypes.bool
};

export default RestaurantListItem;
