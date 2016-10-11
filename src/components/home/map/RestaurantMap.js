import React, {PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';

class RestaurantMap extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
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
    let data = this.props.data;
    let pins = [];
    let len = data.length;
    let bounds = [];
    for(let i=0; i < len; i++){
      let item = data[i];
      let businessLocationLat = item.businessLocationLat;
      let businesssLocationLong = item.businesssLocationLong;
      bounds.push(businessLocationLat, businesssLocationLong);
      pins.push(<div style={greatPlaceStyle} key={i} lat={businessLocationLat} lng={businesssLocationLong}>{i+1}</div>);
    }
    return (
      <div className="col-sm-8"  style={{paddingRight:0, paddingLeft:0}}>
        <div className="iframe-container" style={{height: 400}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA'
            }}
            center={[47.602, -122.332]}
            zoom={9} margin={bounds}>
            {pins}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

RestaurantMap.propTypes = {
  data: PropTypes.array.isRequired
};

export default RestaurantMap;
