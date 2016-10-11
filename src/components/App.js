import React, { PropTypes } from 'react';
import {Link, IndexLink} from 'react-router';

const data = [
  { "businessName": "ADAMS ELEMENTARY SCHOOL", "businessAddress": "6110 28TH AV NW", "businessCity": "Seattle", "businessLocationZip": "98107", "businessPhone": null, "businessLocationLat": 47.6734987391, "businesssLocationLong": -122.3921190670, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "AL'S TAVERN", "businessAddress": "2303 N 45TH ST ", "businessCity": "Seattle", "businessLocationZip": "98103", "businessPhone": "2065459959", "businessLocationLat": 47.6611843419, "businesssLocationLong": -122.3311401963, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALBERT EINSTEIN MIDDLE", "businessAddress": "19343 3RD AV NW ", "businessCity": "SHORELINE", "businessLocationZip": "98177", "businessPhone": null, "businessLocationLat": 47.7693487912, "businesssLocationLong": -122.3614469653, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALBERTSONS #425", "businessAddress": "17171 BOTHELL WAY NE ", "businessCity": "LAKE FOREST PARK", "businessLocationZip": "98155", "businessPhone": null, "businessLocationLat": 47.7540396149, "businesssLocationLong": -122.2795886540, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALBERTSONS #425", "businessAddress": "17171 BOTHELL WAY NE ", "businessCity": "LAKE FOREST PARK", "businessLocationZip": "98155", "businessPhone": null, "businessLocationLat": 47.7540396149, "businesssLocationLong": -122.2795886540, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALLEGRO ESPRESSO BAR", "businessAddress": "4214 UNIVERSITY WAY NE ", "businessCity": "Seattle", "businessLocationZip": "98105", "businessPhone": "2066333030", "businessLocationLat": 47.6587769102, "businesssLocationLong": -122.3128642726, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALPHA CHI OMEGA", "businessAddress": "4545 17TH AV NE ", "businessCity": "Seattle", "businessLocationZip": "98105", "businessPhone": "2065259104", "businessLocationLat": 47.6625452899, "businesssLocationLong": -122.3100219433, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALPHA DELTA PI", "businessAddress": "1805 NE 47TH ST ", "businessCity": "Seattle", "businessLocationZip": "98105", "businessPhone": "2065228137", "businessLocationLat": 47.6628701978, "businesssLocationLong": -122.3081271056, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALPHA GAMMA DELTA", "businessAddress": "4510 21ST AV NE ", "businessCity": "Seattle", "businessLocationZip": "98105", "businessPhone": "2065272351", "businessLocationLat": 47.6616626223, "businesssLocationLong": -122.3051092334, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALPHA PHI", "businessAddress": "4710 19TH AV NE ", "businessCity": "Seattle", "businessLocationZip": "98105", "businessPhone": null, "businessLocationLat": 47.6632945684, "businesssLocationLong": -122.3068752935, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 },
  { "businessName": "ALPHA SIGMA PHI", "businessAddress": "4554 19TH AV NE ", "businessCity": "Seattle", "businessLocationZip": "98105", "businessPhone": null, "businessLocationLat": 47.6628043530, "businesssLocationLong": -122.3068805299, "businessGrade": null, "swlat": 47.0845, "swlng": -122.5284, "nelat": 47.7803, "nelng": -121.0657 }
];

const App = (props) => {

  return (
    <div>
      {/* Render the child route components */}
      {props.children && React.cloneElement(props.children, {data: data})}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
