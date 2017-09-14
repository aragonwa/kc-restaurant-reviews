import React, {PropTypes} from 'react';
import {Gmaps, Marker, InfoWindow} from 'react-gmaps';
import StringHelper from '../utils/StringHelper';
import Ratings from '../utils/Ratings';

//https://github.com/MicheleBertoli/react-gmaps

const params = { v: '3.exp', key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA' };

// const baseDir = (process.env.NODE_ENV === 'production')? '/depts/health/environmental-health/food-safety/inspection-system/qa-search.aspx/#/details/':'/#/details/';
const baseDir = '#/details/';


class GMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.renderInfoWindows = this.renderInfoWindows.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {restaurants} = this.props;
    const {map} = this.state;

    if(restaurants.length === 0) {
      return;
    }

    if(this.props.pagerNum !== prevProps.pagerNum) {
      const bounds = new google.maps.LatLngBounds();
      restaurants.forEach((restaurant) => {
        const lat = restaurant.businessLocationLat;
        let lng = (restaurant.businesssLocationLong)? restaurant.businesssLocationLong: restaurant.businessLocationLong;
        bounds.extend(new google.maps.LatLng(lat,lng));
      });
      map.fitBounds(bounds);
      if(restaurants.length === 1) {
        map.setZoom(16);
      }
   }
  }

  onMapCreated(map) {
    this.setState({map});
    //https://developers.google.com/maps/documentation/javascript/controls
    map.setOptions({
      disableDefaultUI: true,
      zoomControl: true
    });
    const {restaurants} = this.props;
    const bounds = new google.maps.LatLngBounds();

    if(restaurants.length === 0) {
      return;
    }

    restaurants.forEach((restaurant) => {
      const lat = restaurant.businessLocationLat;
      let lng = (restaurant.businesssLocationLong)? restaurant.businesssLocationLong: restaurant.businessLocationLong;
      bounds.extend(new google.maps.LatLng(lat,lng));
    });

    map.fitBounds(bounds);
    if(restaurants.length === 1) {
      map.setZoom(16);
    }
  }

  renderMarkers() {
    const {restaurants} = this.props;
    // const {activeItem} = this.props;
    return restaurants.map((restaurant) => {
      const rating = Ratings.getRatings(restaurant.businessGrade);
      const lat = restaurant.businessLocationLat;
      let lng = (restaurant.businesssLocationLong)? restaurant.businesssLocationLong: restaurant.businessLocationLong;
      const id = restaurant.businessRecordId;
      const icon = require('../assets/img/'+rating.img+'_pin.png');
      // const icon = (activeItem === id) ?
      //   '//maps.google.com/mapfiles/ms/icons/green-dot.png' :
      //   '//maps.google.com/mapfiles/ms/icons/red-dot.png';
      // Add animation
      return (
        <Marker
          icon={icon}
          ref={id}
          key={id}
          lat={lat}
          lng={lng}
          onClick={() => {
            this.onMarkerClick(id, true);
          }}
        />
        );
      }
    );
  }
  renderInfoWindows() {
    const {restaurants} = this.props;
    const {activeItem} = this.props;

    return restaurants.map((restaurant) => {
      const id = restaurant.businessRecordId;
      if(id === activeItem) {
        const lat = restaurant.businessLocationLat;
        let lng = (restaurant.businesssLocationLong)? restaurant.businesssLocationLong: restaurant.businessLocationLong;
        const name = StringHelper.capitalCase(restaurant.businessName);

        return (
          <InfoWindow
            lat={lat}
            lng={lng}
            key={id + '-infowindow'}
            pixelOffset={new google.maps.Size(0, -30)}
            content={'<div style="line-height:1.35"><strong>'+name + '</strong><br /> <a href="'+baseDir+id+'">History <span class="fa fa-chevron-right fa-color-primary" /></a></div>'}
            onCloseClick={() => this.onMarkerClick(null, false)}
          />
        );
      }
    });
  }

  onMarkerClick(id, scroll) {
    this.props.setActiveItem(id, scroll);
  }

  render() {
    const {restaurants} = this.props;
    let height = ($(window).width() < 768) ? '300px' : '600px';
    if(restaurants.length === 0) {
      return <div />;
    }

    return (
      <div className="iframe-container">
        <Gmaps
          ref="gmaps"
          height={height}
          onMapCreated={this.onMapCreated}
          zoom={14}
          params={params}>
          {this.renderMarkers()}
          {this.renderInfoWindows()}
          </Gmaps>
      </div>
    );
  }
}

GMap.propTypes = {
  restaurants: PropTypes.array.isRequired,
  filter: PropTypes.string,
  activeItem: PropTypes.string,
  pagerNum: PropTypes.number,
  setActiveItem: PropTypes.func.isRequired
};

export default GMap;
