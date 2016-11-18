import React, {PropTypes} from 'react';
import {Gmaps, Marker} from 'react-gmaps';

//https://github.com/MicheleBertoli/react-gmaps

const params = { v: '3.exp', key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA' };

class GMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
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
        const lng = restaurant.businesssLocationLong;
        bounds.extend(new google.maps.LatLng(lat,lng));
      });
      map.fitBounds(bounds);
   }
  }

  onMapCreated(map) {
    this.setState({map});
    map.setOptions({
      disableDefaultUI: true
    });
    const {restaurants} = this.props;
    const bounds = new google.maps.LatLngBounds();

    if(restaurants.length === 0) {
      return;
    }

    restaurants.forEach((restaurant) => {
      const lat = restaurant.businessLocationLat;
      const lng = restaurant.businesssLocationLong;
      bounds.extend(new google.maps.LatLng(lat,lng));
    });

    map.fitBounds(bounds);
  }

  renderMarkers() {
    const {restaurants} = this.props;
    const {activeItem} = this.props;
    return restaurants.map((restaurant) => {

      const lat = restaurant.businessLocationLat;
      const lng = restaurant.businesssLocationLong;
      const id = restaurant.businessRecordId;
      const icon = (activeItem === id) ?
        '//maps.google.com/mapfiles/ms/icons/green-dot.png' :
        '//maps.google.com/mapfiles/ms/icons/red-dot.png';
      // Add animation
      return (
        <Marker
          icon={icon}
          ref={id}
          key={id}
          lat={lat}
          lng={lng}
          onClick={() => {
            this.onMarkerClick(id);
          }}
        />
        );
      }
    );
  }

  onMarkerClick(id) {
    this.props.setActiveItem(id);
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
