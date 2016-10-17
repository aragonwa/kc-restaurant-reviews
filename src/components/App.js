import React, { PropTypes } from 'react';
import Paginate from '../containers/Paginate'; // eslint-disable-line import/no-named-as-default

const App = (props) => {
  // Add filter logic here
  return (
      <div>
        <Paginate />
        {props.children}
        <Paginate />
      </div>
    );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
