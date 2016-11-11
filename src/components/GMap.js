import React, {PropTypes} from 'react';
import {Gmaps, Marker} from 'react-gmaps';

//https://github.com/MicheleBertoli/react-gmaps/issues/39
//Make map 2 components: http://stackoverflow.com/questions/32474475/react-update-children-but-not-immediate-parent

class GMap extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.state = {
    //   lat:,
    //   lng:,
    //   zoom: 12
    // }
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }


  // shouldComponentUpdate(nextProps) {
  //   if(this.props.pagerNum === nextProps.pagerNum && this.props.filter === nextProps.filter){
  //     return false;
  //   }
  //   return true;
  // }

  // componentWillReceiveProps(nextProps) {

  // }


//On selection
//
  componentDidUpdate(prevProps) {
    //TODO: Use this to control the render https://facebook.github.io/react/docs/react-component.html#componentdidmount
    const {restaurants} = this.props;
    const {map} = this.state;

    if(restaurants.length === 0) {
      return;
    }
    //if(this.props.pagerNum !== prevProps.pagerNum) {
    const zoom = this.refs.gmaps.getMap().getZoom();
    const center = map.getCenter();
    console.log(this.refs.gmaps.getMap().center.lat);

    const bounds = new google.maps.LatLngBounds();
    restaurants.forEach((restaurant) => {
      const lat = restaurant.businessLocationLat;
      const lng = restaurant.businesssLocationLong;
      bounds.extend(new google.maps.LatLng(lat,lng));
    });
    map.fitBounds(bounds);
    map.setZoom(zoom);
    //console.log(this.refs.gmaps.getMap().getZoom());
   //}
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

  // onBoundsChanged(){

  // }

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

  // handle() {
  //   //console.log('zoom:', this.refs.gmaps.getMap().getZoom(), this.refs.gmaps.getMap().getCenter().lat());
  // }

  onMarkerClick(id) {
    //TODO: map.setCenter(marker lat lng);

    // this.setState({
    //   zoom: map.getZoom(),
    //   lat: map.getCenter().lat(),
    //   lng: map.getCenter().lng()
    // });
    this.props.setActiveItem(id);
  }

  //https://github.com/MicheleBertoli/react-gmaps/issues/47
  //https://github.com/MicheleBertoli/react-gmaps/issues/40
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
          params={{v: '3.exp', key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA'}}
          onMapCreated={this.onMapCreated}>
          {this.renderMarkers()}
          </Gmaps>
      </div>
    );
  }
}

GMap.propTypes = {
  restaurants: PropTypes.array.isRequired,
  filter: PropTypes.string
};

export default GMap;
