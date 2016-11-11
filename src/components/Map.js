import React, {PropTypes} from 'react';
import {GoogleMap} from 'google-map-react';

//https://github.com/MicheleBertoli/react-gmaps/issues/39
//Make map 2 components: http://stackoverflow.com/questions/32474475/react-update-children-but-not-immediate-parent

class Map extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      center: {lat: 59.938043, lng: 30.337157},
      zoom: 9,
      greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
    }
  }

  render() {
    return (
      <GoogleMap
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}>
        <div lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
      </GoogleMap>
    );
  }
}

Map.propTypes = {

};

export default Map;
