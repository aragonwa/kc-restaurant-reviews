import React from 'react';
import GoogleMapReact from 'google-map-react';

const RestaurantMap = () => {
    return (
      <div className="col-sm-8"  style={{paddingRight:0, paddingLeft:0}}>
        <div className="iframe-container" style={{height: 400}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDHJbH9ajNAa3hm7Sl5l3TklpGSB5by4mA'
            }}
            center={[47.602, -122.332]}
            zoom={9} />
        </div>
      </div>
  );
};

export default RestaurantMap;
