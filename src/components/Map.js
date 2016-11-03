import React, {PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';
import Filters from '../utils/Filters';
//https://github.com/istarkov/google-map-react/issues/3 fitbounds stuff here
// import {fitBounds} from 'google-map-react/utils';

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {restaurants, pagerNum} = this.props;

    const K_WIDTH = 40;
    const K_HEIGHT = 40;
    const greatPlaceStyle = {
      // initially any map object has left top corner at lat lng coordinates
      // it's on you to set object origin to 0,0 coordinates
      position: 'absolute',
      width: K_WIDTH,
      height: K_HEIGHT,
      left: -K_WIDTH / 2,
      top: -K_HEIGHT / 2,

      border: '5px solid #f44336',
      borderRadius: K_HEIGHT,
      backgroundColor: 'white',
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    };
    // let data = this.props.data;
    let pins = [];
    let len = restaurants.length;
    //let bounds = [];
    for(let i=0; i < len; i++){
      let item = restaurants[i];
      let businessLocationLat = item.businessLocationLat;
      let businesssLocationLong = item.businesssLocationLong;
      //bounds.push(businessLocationLat, businesssLocationLong);
      pins.push(<div style={greatPlaceStyle} key={i} lat={businessLocationLat} lng={businesssLocationLong}>{i+1}</div>);
    }
    pins = Filters.filterPagerItems(pins, pagerNum);

    // const size = {
    //   width: 640, // Map width in pixels
    //   height: 380, // Map height in pixels
    // };

    // const boundss = {
    // nw: {
    //   lat: 50.01038826014866,
    //   lng: -118.6525866875,
    //  },
    //  se: {
    //   lat: 32.698335045970396,
    //   lng: -92.0217273125,
    //  },
    // };

    // const {center, zoom} = fitBounds(boundss, size);

    return (
      <div style={{paddingRight:0, paddingLeft:0}}>
        <div className="iframe-container" style={{height: 600}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA'
            }}
            center={[47.602, -122.332]}
            zoom={9}
          >
            {pins}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  restaurants: PropTypes.array.isRequired,
  pagerNum: PropTypes.number.isRequired,
};

export default Map;
