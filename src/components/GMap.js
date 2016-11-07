import React, {PropTypes} from 'react';
import {Gmaps, Marker} from 'react-gmaps';
// import Scroll from 'react-scroll';
//https://github.com/MicheleBertoli/react-gmaps/issues/39

class GMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   // center: {
    //   //   lat: 47.602,
    //   //   lng: -122.332
    //   // }
    // };
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  shouldComponentUpdate(nextProps){
    if(this.props.pagerNum === nextProps.pagerNum && this.props.filter === nextProps.filter){
      return false;
    }
    return true;
  }
  componentDidUpdate() {
    const restaurants = this.props.restaurants;
    const map = this.state.map;

    if(restaurants.length === 0) {
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    for(let i=0; i < restaurants.length; i++){
      let item = restaurants[i];
      let businessLocationLat = item.businessLocationLat;
      let businesssLocationLong = item.businesssLocationLong;
      bounds.extend(new google.maps.LatLng(businessLocationLat,businesssLocationLong));
    }
    map.fitBounds(bounds);
  }

  onMapCreated(map) {
    this.setState({map});
    map.setOptions({
      disableDefaultUI: true
    });
    const restaurants = this.props.restaurants;

    if(restaurants.length === 0) {
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    for(let i=0; i < restaurants.length; i++){
      let item = restaurants[i];
      let businessLocationLat = item.businessLocationLat;
      let businesssLocationLong = item.businesssLocationLong;
      bounds.extend(new google.maps.LatLng(businessLocationLat,businesssLocationLong));
    }
    map.fitBounds(bounds);
  }

  onMarkerClick(id) {
    //TODO: Add info box
    //TODO: Use this to control the render https://facebook.github.io/react/docs/react-component.html#componentdidmount
    //TODO: Add infowindows https://gist.github.com/MicheleBertoli/cdd3960f608574e49e24
    //TODO: map.setCenter(marker lat lng);
    this.props.setActiveItem(id);
  }

  render() { 
    const {restaurants} = this.props;
    let height = ($(window).width() < 768) ? '300px' : '600px';
    if(restaurants.length === 0) {
      return <div />;
    }
    // const {center} = this.state;
    const markers = [];
    let len = restaurants.length;
    for(let i=0; i < len; i++){
      let item = restaurants[i];
      let clickHandler = () => this.onMarkerClick(item.businessRecordId);
      let businessLocationLat = item.businessLocationLat;
      let businesssLocationLong = item.businesssLocationLong;
      markers.push(<Marker key={item.businessRecordId} lat={businessLocationLat} lng={businesssLocationLong} onClick={clickHandler} />);
    }
          // lat={center.lat}
          // lng={center.lng}
    return (
      <div className="iframe-container">
        <Gmaps
          ref="gmaps"
          height={height}
          zoom={12}
          params={{v: '3.exp', key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA'}}
          onMapCreated={this.onMapCreated}>
          {markers}
        </Gmaps>
      </div>
    );
  }
}

GMap.propTypes = {
  restaurants: PropTypes.array.isRequired,
  pagerNum: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  filter: PropTypes.string
};

export default GMap;
