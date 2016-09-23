import React, { PropTypes } from 'react';
import {Link, IndexLink} from 'react-router';

      // <IndexLink to="/" className="btn btn-primary btn-lg">Home</IndexLink> {'|'}
      // <Link to="details" className="btn btn-primary btn-lg">Details example page</Link>
      // <br />

const App = (props) => {
  return (
    <div>
      <IndexLink to="/" className="btn btn-primary btn-lg">Home</IndexLink>
      <Link to="/details" className="btn btn-primary btn-lg">Details example page</Link>
      <br />
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
